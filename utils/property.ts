import { PageType, PropertyType, RichTextType } from "../types/types";

export const getText = (richTextArr: RichTextType[]) => {
  try {
    const textArr = richTextArr.map((richText) => richText.plain_text);

    return textArr.join("");
  } catch (err) {
    console.error(err);
  }

  return "";
};

export const getCover = (cover: PageType["cover"]) => {
  if (cover && cover.file) return cover.file.url;
  if (cover && cover.external) return cover.external.url;

  return "/noimage.png";
};

export const getDate = (date: PropertyType["published"]["date"]) => {
  try {
    return date.start;
  } catch (err) {
    console.error(err);
  }

  return "-";
};

export const getMultiSelect = (
  multiSelect: PropertyType["tag"]["multi_select"]
) => {
  try {
    return multiSelect.map((tag) => tag.name);
  } catch (err) {
    console.error(err);
  }

  return [];
};
