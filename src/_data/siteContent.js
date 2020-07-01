const Airtable = require('airtable')

require('dotenv').config()

const { AIRTABLE_API_KEY, AIRTABLE_BASE } = process.env

Airtable.configure({
  apiKey: AIRTABLE_API_KEY
})

const base = Airtable.base(AIRTABLE_BASE)

module.exports = () => {
  return new Promise((resolve, reject) => {
    let allRecords = {
      home: [],
      pages: [],
      sections: [],
    }

    base('Pages')
      .select({
        maxRecords: 999
      })
      .eachPage((records, fetchNextPage) => {
        records.forEach(r => {
          const record = {
            title: r.get('Title'),
            content: r.get('Content'),
            layout: r.get('Page Format'),
            permalink: r.get('Permalink'),
            order: r.get('Order')
          }

          if (record.layout === 'home') {
            allRecords.home.push(record)
          }

          if (record.layout === 'section') {
            allRecords.sections.push(record)
          }

          if (
            record.permalink &&
            record.permalink !== '/' &&
            record.permalink !== 'false'
          ) {
            allRecords.pages.push(record)
          }
        })

        fetchNextPage()
      })
      .then(err => {
        if (err) {
          reject(err)
        } else {
          Object.keys(allRecords).forEach(k => {
            allRecords[k] = allRecords[k].sort((a, b) => a.order < b.order ? -1 : 1);
          })
          resolve(allRecords)
        }
      })
  })
}
