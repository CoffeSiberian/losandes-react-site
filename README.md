#### Client application created in REACT for TruckersMP VTC's

##### The backend of the app can be found here [losandes-express-site](https://github.com/CoffeSiberian/losandes-express-site "losandes-express-site")

---

##### Environment Variables

```
VITE_TITLE=site_title
VITE_REST_API_URL=https://api.url.com
VITE_CAPTCHA_KEY=recaptcha_v2_site_key
```

##### Additional settings _(required)_

###### Generate inside of ./src/config.json

```json
{
    "staff": [
        {
            "staff_id": 1,
            "staff_color": "#ffffff"
        },
        {
            "staff_id": 2,
            "staff_color": "#ffffff"
        }
    ],
    "partners": [
        {
            "name": "partner_1",
            "logo": "partner_1.png",
            "link": "vtc_link_1"
        },
        {
            "name": "partner_2",
            "logo": "partner_2.png",
            "link": "vtc_link_2"
        }
    ],
    "hall_of_fame": [
        {
            "rol_id": "0",
            "featured": false,
            "rol_name": "name"
        },
        {
            "rol_id": "1",
            "featured": false,
            "rol_name": "name"
        }
    ]
}
```

##### Variable Explanation

-   **staff**: You will need the VTC role ID in TruckersMP
-   **partners**: The data of the allied vtc _(you have to save the images in the backend)_ [getPartnerLogo](https://github.com/CoffeSiberian/losandes-express-site/blob/main/routes/getPartnerLogo.ts "getPartnerLogo")
-   **hall_of_fame**: Created to list employees within your **discord server** who stand out in some way

---

##### How to use

Install dependencies

```bash
npm i
```

Generate the transpilation of the code

```bash
npm run build
```

This process generates the necessary files inside the **./build** folder to deploy the website _(it is recommended to use **apache**)_
