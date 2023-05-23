import JsonConfigs from "../config.json";

export const TITLE = process.env.REACT_APP_TITLE
export const REST_API_URL = process.env.REACT_APP_REST_API_URL;

export const STAFFS = JsonConfigs.staff;
export const STAFF_IDS = JSON.parse(`{"roles":[${STAFFS.map((staff) => staff.staff_id)}]}`);
export const STAFF_COLORS = JSON.parse(`{"roles":[${STAFFS.map((staff) => `"${staff.staff_color}"`)}]}`);

export const PARTNERS = JsonConfigs.partners;
export const HALL_OF_FAME = JsonConfigs.hall_of_fame;
export const CAPTCHA_KEY = process.env.REACT_APP_CAPTCHA_KEY;
