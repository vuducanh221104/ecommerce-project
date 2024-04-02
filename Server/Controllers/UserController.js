const User = require('../Models/Users');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const fs = require('fs');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



async function createOAuth2Transporter() {
    try {
        const credentials = JSON.parse(
            fs.readFileSync(
                '/Users/ducanhh/CODE/Ecommerce Expressjs + Reactjs/Server/oAuth2/client_secret_495074441762-ravijsdevm3no1q7a6sb0hu92ofomr6a.apps.googleusercontent.com.json',
            ),
        );

        const oAuth2Client = new google.auth.OAuth2(
            credentials.web.client_id,
            credentials.web.client_secret,
            credentials.web.redirect_uris[0],
        );

        oAuth2Client.setCredentials({
            access_token: credentials.web.access_token,
            refresh_token: credentials.web.refresh_token,
        });

        const accessToken = await oAuth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'vuducanh22112004@gmail.com',
                clientId: credentials.web.client_id,
                clientSecret: credentials.web.client_secret,
                refreshToken: credentials.web.refresh_token,
                accessToken: accessToken,
            },
        });

        return transporter;
    } catch (err) {
        res.status(500).json('Error creating OAuth2 transporter:', err);
        throw err;
    }
}

async function sendConfirmationEmail(email, verificationToken) {
    try {
        const transporter = await createOAuth2Transporter();

        const mailOptions = {
            from: 'vuducanh22112004@gmail.com',
            to: email,
            subject: 'Xác nhận địa chỉ email',
            html: `<p>Chào mừng bạn đến với trang web ! Hãy nhấp vào liên kết dưới đây để xác nhận địa chỉ email của bạn:</p>
            <a href="${process.env.BASE_URL_SERVER}/api/user/verify-email/${verificationToken}">Xác nhận địa chỉ email</a>`,
        };
        const info = await transporter.sendMail(mailOptions);
    } catch (err) {
        console.log(err);
    }
}

async function sendConfirmationNewEmail(email, verificationToken) {
    const transporter = await createOAuth2Transporter();

    const mailOptions = {
        from: 'vuducanh22112004@gmail.com',
        to: email,
        subject: 'Xác nhận địa chỉ email',
        html: `<p>Chào mừng bạn đến với trang web ! Hãy nhấp vào liên kết dưới đây để xác nhận địa chỉ email của bạn:</p>
               <a href="${process.env.BASE_URL_SERVER}/api/user/confirm-new-email/${verificationToken}">Xác nhận địa chỉ email</a>`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
    } catch (err) {
        res.status(500).json('Error sending confirmation email:', err);
    }
}

async function sendConfirmationForgotPass(email, forgotPassToken) {
    const transporter = await createOAuth2Transporter();

    const mailOptions = {
        from: 'vuducanh22112004@gmail.com',
        to: email,
        subject: 'Xác nhận địa chỉ email',
        html: `<p>Chào mừng bạn đến với trang web ! Hãy nhấp vào liên kết dưới đây để xác nhận địa chỉ email của bạn:</p>
        <a href="${process.env.BASE_URL_CLIENT}/forgotPassword/comfirm/?email=${email}&token=${forgotPassToken}">Xác nhận địa chỉ email</a>`,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (err) {
        res.status(500).json('Error sending confirmation email:', err);
    }
}

class UserController {
    //Handle Forgot Password
    async fotgotPassword(req, res) {
        const { email } = req.body;

        // Tạo mã xác nhận mới cho forgotPassToken
        const forgotPassToken = crypto.randomBytes(32).toString('hex');

        try {
            await sendConfirmationForgotPass(email, forgotPassToken);
            // Cập nhật forgotPassToken vào tài liệu người dùng
            await User.findOneAndUpdate({ email }, { forgotPassToken: forgotPassToken });
            res.status(200).json({ message: 'Send Successful' });
        } catch (error) {
            console.error('Error sending reset password email:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    async comfirmForgotPassword(req, res) {
        // const {} = req.query;
        const { password, email, token } = req.body;
        try {
            const user = await User.findOne({ email: email }, { forgotPassToken: token });

            if (!user) {
                return res.status(400).json({ message: 'Invalid token' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            user.password = hashedPassword;
            user.forgotPassToken = undefined;
            await user.save();

            return res.status(200).json({ messsage: 'Change Pass Success' });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }
    // [GET]check-username ~CHECK-USERNAME
    async checkUser(req, res) {
        const { username } = req.query;
        try {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                // Trả về thông báo rằng username đã tồn tại
                return res.status(201).json({ exists: true });
            }
            // Trả về thông báo rằng username không tồn tại
            res.status(200).json({ exists: false });
        } catch (err) {
            // Xử lý lỗi nếu có
            res.status(500).json({ error: 'Server error' });
        }
    }

    // [GET]check-email ~CHECK-EMAIl
    async checkEmail(req, res) {
        const { email } = req.query;
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(201).json({ exists: true });
            }
            res.status(200).json({ exists: false });
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    // [GET]/users/check-password ~CHECK PASSWORD
    async checkPassword(req, res) {
        const { password } = req.query;
        try {
            const existingUser = await User.findOne({ password });
            if (existingUser) {
                return res.status(201).json({ exists: true });
            }
            res.status(200).json({ exists: false });
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    //[POST]/change-email ~Change Email
    async changEmail(req, res) {
        const { userId, newEmail } = req.body;
        try {
            const verificationToken = crypto.randomBytes(32).toString('hex');

            await User.findByIdAndUpdate({ _id: userId }, { newEmail, newEmailVerificationToken: verificationToken });

            await sendConfirmationNewEmail(newEmail, verificationToken);

            res.status(200).json({ message: 'Email change request submitted' });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    async changePassword(req, res) {
        try {
            const { email, oldPassword, newPassword } = req.body;

            const user = await User.findOne({ email }); // Tìm người dùng trong DB dựa trên email
            if (!user) {
                return res.status(404).json('User not found');
            }

            const isMatch = await bcrypt.compare(oldPassword, user.password); // So sánh mật khẩu cũ đã hash với mật khẩu đã hash trong DB
            if (!isMatch) {
                return res.status(400).json('Old password is incorrect');
            }

            const salt = await bcrypt.genSalt(10); // Tạo salt mới
            const hashedNewPassword = await bcrypt.hash(newPassword, salt); // Hash mật khẩu mới

            user.password = hashedNewPassword; // Cập nhật mật khẩu mới đã hash vào đối tượng user
            await user.save(); // Lưu lại thay đổi vào cơ sở dữ liệu

            res.status(200).json('Password changed successfully');
        } catch (err) {
            res.status(500).json('Error');
        }
    }

    // [GET]/verify-email/:token  ~VERIFYEMAIL
    async verifyEmail(req, res, next) {
        const { token } = req.params;

        try {
            const user = await User.findOne({ verificationToken: token });

            if (!user) {
                // Mã token không hợp lệ
                return res.status(400).json({ message: 'Invalid verification token' });
            }

            // Xác nhận email và xóa mã token xác nhận
            user.isVerified = true;
            user.verificationToken = undefined;
            await user.save();
            res.redirect('http://localhost:3000');
        } catch (error) {
            // Xử lý lỗi nếu có
            res.status(500).json({ error: 'Server error' });
        }
    }

    // [POST]/resend-confirmation-email ~RESEND-EMAI:
    async resendEmail(req, res, next) {
        const { email } = req.body;
        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            if (user.isVerified) {
                return res.status(400).json({ message: 'Email is already verified' });
            }

            // Gửi lại email xác nhận
            await sendConfirmationEmail(email, user.verificationToken);

            res.status(200).json({ message: 'Confirmation email resent successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    //[GET]/confirm-new-email/:token ~Verify New Email
    async verifyNewEmail(req, res) {
        const { token } = req.params;
        try {
            const user = await User.findOne({ newEmailVerificationToken: token });
            if (!user) {
                return res.status(400).json({ message: 'Invalid confirmation token' });
            }

            user.email = user.newEmail;
            user.newEmail = undefined;
            user.newEmailVerificationToken = undefined;
            await user.save();
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    // [POST]/resend-confirmation-email ~RESEND-NEW-EMAIL:
    async resendNewEmail(req, res, next) {
        const { newEmail } = req.body;
        try {
            const user = await User.findOne({ newEmail });
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            // Gửi lại email xác nhận
            await sendConfirmationNewEmail(newEmail, user.newEmailVerificationToken);

            res.status(200).json({ message: 'Confirmation email resent successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    // [PATCH]/:id
    async editId(req, res, next) {
        try {
            const userId = req.params.id;
            const result = await User.updateOne({ _id: userId }, { $set: req.body });
            if (result.nModified === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    // [POST]
    async registerUser(req, res) {
        const { fullname, username, email, phone, password } = req.body;
        try {
            // Mã hóa mật khẩu
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Tạo đối tượng User mới
            const newUser = await User.create({
                fullname,
                username,
                email,
                phone,
                password: hashedPassword,
                verificationToken: crypto.randomBytes(32).toString('hex'),
                role: 0,
            });

            // Gửi email xác nhận
            await sendConfirmationEmail(email, newUser.verificationToken);

            // Trả về thông tin user đã được tạo
            res.status(200).json(newUser);
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    // [POST]
    async loginUser(req, res) {
        try {
            const user = await User.findOne({
                $or: [{ username: req.body.usernameOrEmail }, { email: req.body.usernameOrEmail }],
            });
            if (!user) {
                res.status(404).json('Wrong username!');
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                res.status(404).json('Wrong password');
            }
            if (user && validPassword) {
                const accessToken = jwt.sign(
                    {
                        _id: user._id,
                    },
                    process.env.JWT_ACCESS_KEY,
                    { expiresIn: '30s' },
                );

                const refreshToken = jwt.sign(
                    {
                        _id: user._id,
                    },
                    process.env.JWT_REFRESH_KEY,
                    { expiresIn: '1d' },
                );
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: 'strict',
                });
                const { password, ...other } = user._doc;
                res.status(200).json({ ...other, accessToken });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
    // [POST]
    async logoutUser(req, res) {
        res.clearCookie('refreshToken');
        res.status(200).json('Logouted');
    }

    async requestRefreshToken(req, res) {
        // res.status(403).json('You`re is not valid');
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(403).json('You`re is not valid');

        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                return res.status(403).json('Refresh Token is not valid ');
            }

            const newAccessToken = jwt.sign(
                {
                    _id: user._id,
                },
                process.env.JWT_ACCESS_KEY,
                { expiresIn: '30s' },
            );

            const newRefreshToken = jwt.sign(
                {
                    _id: user._id,
                },
                process.env.JWT_REFRESH_KEY,
                { expiresIn: '1d' },
            );
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict',
            });
            res.status(200).json({ accessToken: newAccessToken });
        });
    }
}

module.exports = new UserController();
