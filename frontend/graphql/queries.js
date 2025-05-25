/**
 * Queries that were used to get data from GraphQL in zone01Oujda.
 * @returns query
 */
export const queries = {
  user: `{
  user {
    login
    attrs
    auditRatio
    campus
    totalDown
    totalUp
  }
}`,
  level: `{
  transaction_aggregate(
    where: {type: {_eq: "level"}, event: {object: {name: {_eq: "Module"}}}}
    order_by: {createdAt: desc}
  ) {
    aggregate {
      max {
        amount
      }
    }
  }
}`,
  xp: `{
  transaction_aggregate(
    where: {type: {_eq: "xp"}, eventId: {_eq: 41}}
    order_by: {createdAt: desc}
  ) {
    aggregate {
      sum {
        amount
      }
    }
  }
}`,
  skills: `{
  transaction(
    where: {type: {_like: "skill_%"}}
    order_by: [{type: asc}, {amount: desc}]
    distinct_on: type
  ) {
    type
    amount
  }
}`,
  projects: `{
  transaction(
    where: {type: {_eq: "xp"}, eventId: {_eq: 41},path:{_nilike:"%checkpoint%",_nlike:"%piscine-js%"}}
    order_by: {createdAt: desc}
  ) {
    path
    amount
    createdAt
  }
}`
};