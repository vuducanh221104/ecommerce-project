import moment from 'moment';
function ExchangTime({ time }) {
    function formatTimestamp(timestamp) {
        const formattedDate = moment(timestamp).format('MM/DD/YYYY HH:mm:ss');
        return formattedDate;
    }
    return formatTimestamp(time);
}

export default ExchangTime;
