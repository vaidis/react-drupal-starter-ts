import { IPostArticle } from './articlePost-types';

/**
 * The body of the new article POST request
 * used as payload for the postArticle action
 * according to drupal format
 * 
 * https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module/creating-new-resources-post
 */
export function payload({ title, body, fileId, tags }: {
  title: string;
  body: string;
  fileId: string;
  tags: string[];
}): IPostArticle {

  const data = {
    "data": {
      "type": "node--article",
      "attributes": {
        "title": title,
        "body": {
          "value": body,
          "format": "plain_text"
        }
      },
      "relationships": {
        "field_image": {
          "data": {
            "type": "file--file",
            "id": fileId,
            "meta": {
              "alt": "Json Uploaded Testing",
              "title": "Json Uploaded Testing",
              "width": null,
              "height": null
            }
          }
        },
        "field_tags": {
          "data": tags
        }
      }
    }
  }

  return data;
}