/** BACKEND */
export const BASE = "https://stevaidis.mywire.org:444"
export const BASE_API = `${BASE}/jsonapi`
export const CSRF_TOKEN = `${BASE}/session/token`

/** USER */
export const LOGIN = `${BASE}/user/login?_format=json`
export const REGISTER = `${BASE}/user/register?_format=json`
export const STATUS = `${BASE}/user/login_status?_format=json`
export const LOGOUT = `${BASE}/user/logout?_format=json`

/** ARTICLE */
export const ARTICLE = (path: any) => `${BASE_API}/node/article?include=field_image,field_tags,uid&filter[field_path][value]=/article/${path.payload.path}`
export const POST_TAG = `${BASE_API}/taxonomy_term/tags`
export const ARTICLE_POST_FILE = `${BASE_API}/node/article/field_image`
export const ARTICLE_POST = `${BASE_API}/node/article`

/** ARTICLES */
export const ARTICLES = (params: any) => {
  const NODE = '/node/article'
  const INCLUDE = '?query_string=&include=field_image,field_tags,uid'
  const OFFSET = '&page[offset]='
  const LIMIT = '&page[limit]='
  const SORT = '&sort[sort-created][path]=created'
  
  const filterTagsName = '&filter[taxonomy_term--tags][condition][path]=field_tags.name'
  const filterTagsOP = '&filter[taxonomy_term--tags][condition][operator]=IN'
  const filterTagsValue = '&filter[taxonomy_term--tags][condition][value][]='
  const FILTER = (term: string) => `${filterTagsName}${filterTagsOP}${filterTagsValue}${term}`
  
  /**
   * drupal jsonapi module format
   */
  const ARTICLES = `${BASE_API}${NODE}${INCLUDE}${SORT}${OFFSET}${params.offset}${LIMIT}${params.limit}`

  /** 
   * if the url in the browser has any term parameter
   * fetch the articles that contain this term (with fields, sort, and pager data)
   * 
   * http://localhost:3000/?terms=blueberry
   * http://localhost:8080/jsonapi/node/article?query_string=&include=field_image,field_tags,uid&sort[sort-created][path]=created&page[offset]=0&page[limit]=2&filter[taxonomy_term--tags][condition][path]=field_tags.name&filter[taxonomy_term--tags][condition][operator]=IN&filter[taxonomy_term--tags][condition][value][]=blueberry
   */
  if (params.terms !== "") {
    var FILTERS:any = '';
    params.terms.split(',').map((term: string) => {
      return (
        FILTERS = FILTERS + FILTER(term)
      )
    })
    return `${ARTICLES}${FILTERS}`
  }
  /**
   * else, get all articles (with fields, sort, and pager data)
   * 
   * http://localhost:3000/?offset=8
   * http://localhost:8080/jsonapi/node/article?query_string=&include=field_image,field_tags,uid&page[limit]=2&page[offset]=8
   */
    return `${ARTICLES}`
}

/** VOCABULARY */
export const VOCABULARY = (vocabulary: any) => `${BASE_API}/taxonomy_term/${vocabulary}`;