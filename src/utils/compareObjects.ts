import { IUrlParams } from '../articles/articles-types'

function isObject(object: object): boolean {
  return object != null && typeof object === 'object';
}

/**
 * Compare Objects
 * 
 * used by Articles.tsx
 * 
 * code from:
 * https://dmitripavlutin.com/how-to-compare-objects-in-javascript/
 * https://github.com/panzerdp/dmitripavlutin.com/blob/master/content/posts/083-compare-objects/index.md
 */
// export function compareObjects(object1: any, object2: any): boolean {
export function compareObjects(object1: IUrlParams, object2: IUrlParams): boolean {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1: any = object1[key];
    const val2: any = object2[key];
    const areObjects = isObject(val1) && isObject(val2);

    if (
      (areObjects && !compareObjects(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
    
  }
  return true;
}

