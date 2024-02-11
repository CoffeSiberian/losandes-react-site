import JsonConfigs from "../config.json";

export const TITLE = import.meta.env.VITE_TITLE;
export const REST_API_URL = import.meta.env.VITE_REST_API_URL;
export const CAPTCHA_KEY = import.meta.env.VITE_CAPTCHA_KEY;

export const STAFFS = JsonConfigs.staff;
export const STAFF_IDS = JSON.parse(
    `{"roles":[${STAFFS.map((staff) => staff.staff_id)}]}`
);
export const STAFF_COLORS = JSON.parse(
    `{"roles":[${STAFFS.map((staff) => `"${staff.staff_color}"`)}]}`
);

export const PARTNERS = JsonConfigs.partners;
export const HALL_OF_FAME = JsonConfigs.hall_of_fame;
