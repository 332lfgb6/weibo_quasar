const CATEGORY_KEY = 'category'
export const setCategoryID = category => {
  localStorage.setItem(CATEGORY_KEY, JSON.stringify(category))
}
export const getCategoryID = () => {
  return parseInt(localStorage.getItem(CATEGORY_KEY))
}
