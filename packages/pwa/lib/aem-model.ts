export const getAEMModelProps = (attrs: any) => {
  return {
    cqItems: attrs[':items'],
    cqItemsOrder: attrs[':itemsOrder'],
    ...attrs,
  }
}
