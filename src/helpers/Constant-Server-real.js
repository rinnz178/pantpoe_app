/** @format */

import React from "react";
import moment from "moment";
//export const BaseUrl2 = validateURL("http://localhost:8000/api/v1");
function validateURL(url) {
  const parsed = new URL(url);
  return ["https:", "http:"].includes(parsed.protocol) ? url : "invaluid route";
}
const backendurl = "https://adminpanel.pantpoe.com";
export const BaseUrl = validateURL(`${backendurl}/api/v1`);
//export const single_product_url = `https://course-api.com/react-store-single-product?id=`

export const ImgUrl = `${backendurl}storage/`;

export const customFetcher = async (url = "") => {
  const preview_api = `https://api.linkpreview.net/?key=${process.env.REACT_APP_LINK_PREVIEW_ID}`;

  let response = await fetch(`${preview_api}&q=${url}`);
  const json = await response.json();
  return json;
  //  return json.metadata;
};

export const getFullUrl = (path) => {
  return `${backendurl}/storage/` + path;
};
export const FrontEndBaseUrl = "https://pantpoe.com/";

export const RBaseUrl = "https://pantpoe.com/creator-profile/";

export const profileUrl = (keyword) => {
  return `https://pantpoe.com/${keyword}`;
};

export const changeSocials = (data) => {
  let acc = [];
  console.log(data);
  if (data.length > 0) {
    return data.map((i) => {
      acc[0] = i.link;
      acc[1] = i.name;
      return [...acc];
    });
  } else {
    return [];
  }
};

export const getByLastMonth = () => {
  // var date = new Date();
  // var firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  // var lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
  // alert(firstDay.format("MM/DD/YYYY") + "===" + lastDay.format("MM/DD/YYYY"));
  let thisMoment = moment();
  let endOfMonth = moment(thisMoment).endOf("month").subtract(1, "months");
  let startOfMonth = moment(thisMoment).startOf("month").subtract(1, "months");

  return {
    start: startOfMonth.format("YYYY-MM-DD"),
    end: endOfMonth.format("YYYY-MM-DD"),
  };
};

export const getByLastWeek = () => {
  return {
    start: moment().subtract(1, "weeks").startOf("week").format("YYYY-MM-DD"),
    end: moment().subtract(1, "weeks").endOf("week").format("YYYY-MM-DD"),
  };
};
export const getBycurrentWeek = () => {
  var startDate = moment().startOf("week");
  var endDate = moment().endOf("week");

  return {
    start: new Date(startDate.format("YYYY-MM-DD")).getTime(),
    end: new Date(endDate.format("YYYY-MM-DD")).getTime(),
  };
};
export const getByThisMonth = () => {
  let thisMoment = moment();
  let endOfMonth = moment(thisMoment).endOf("month");
  let startOfMonth = moment(thisMoment).startOf("month");
  return {
    start: new Date(startOfMonth.format("YYYY-MM-DD")).getTime(),
    end: new Date(endOfMonth.format("YYYY-MM-DD")).getTime(),
  };
};
