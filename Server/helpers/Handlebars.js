const Handlebars = require('handlebars')

module.exports = {
    sum:(a,b) => a+b,
    sortable : (feild , sort ) =>{

        const sortType = feild === sort.column ? sort.type : 'default'
  
        const icons = {
          default : 'oi oi-elevator',
          asc : 'oi oi-sort-ascending',
          desc : 'oi oi-sort-descending',
        }
  
        const types = {
          default :'desc',
          desc : 'asc',
          asc:'desc',
        }
  
  
  
  
        const icon = icons[sortType] 
        const type = types[sortType]
    
        const href =  Handlebars.escapeExpression(`?_sort&column=${feild}&type=${type}`) 


        const output =  `
        <a href="${href}">
              <span class="${icon}"></span>                    
        </a>`

        return new Handlebars.SafeString(output)
      }
}