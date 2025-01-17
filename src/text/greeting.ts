import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

// Base URL for quizzes
const baseUrl = 'https://quizes.pages.dev/play?title=';

// Array of quiz data with the specified format
const quizData = [
    {
        "title": "jee-main-misc",
        "papers": [
            {
                "exam": "jee-main-misc",
                "examGroup": "jee",
                "metaId": "emb-ait1",
                "title": "JEE Main 2024 Misc Paper 1",
                "year": 2024
            },
            {
                "exam": "jee-main-misc",
                "examGroup": "jee",
                "metaId": "emb-ait2",
                "title": "JEE Main 2024 Misc Paper 2",
                "year": 2024
            },
            {
                "exam": "jee-main-misc",
                "examGroup": "jee",
                "metaId": "emb-ait3",
                "title": "JEE Main 2024 Misc Paper 3",
                "year": 2024
            },
            {
                "exam": "jee-main-misc",
                "examGroup": "jee",
                "metaId": "emb-ait4",
                "title": "JEE Main 2024 Misc Paper 4",
                "year": 2024
            }
        ]
    },
    {
        "title": "jee-main",
        "papers": [
            {
                "exam": "jee-main1",
                "examGroup": "jee",
                "languages": [
                    "en",
                    "hi"
                ],
                "metaId": "ea796dc1-636a-56c7-8bb7-6ad4bd78c214",
                "title": "JEE Main 2024 (Online) 1st February Evening Shift",
                "year": 2024
            },
            {
                "exam": "jee-main1",
                "examGroup": "jee",
                "languages": [
                    "en",
                    "hi"
                ],
                "metaId": "c49dc967-b979-5bd1-849d-5d4214b8c128",
                "title": "JEE Main 2024 (Online) 1st February Morning Shift",
                "year": 2024
            },
            {
                "exam": "jee-main1",
                "examGroup": "jee",
                "languages": [
                    "en",
                    "hi"
                ],
                "metaId": "3b62e584-636e-56c7-b42d-1d610eb0fbd6",
                "title": "JEE Main 2024 (Online) 31st January Evening Shift",
                "year": 2024
            },
            {
                "exam": "jee-main1",
                "examGroup": "jee",
                "languages": [
                    "en",
                    "hi"
                ],
                "metaId": "ea2db01b-de0c-5ef3-b5c1-f09eab71a405",
                "title": "JEE Main 2024 (Online) 31st January Morning Shift",
                "year": 2024
            },
            {
                "exam": "jee-main1",
                "examGroup": "jee",
                "metaId": "1cd11aa3-6217-54ef-bf4b-4438e2fda38c",
                "title": "JEE Main 2024 (Online) 30th January Evening Shift",
                "year": 2024
            },
            {
                "exam": "jee-main1",
                "examGroup": "jee",
                "metaId": "2ea34c8a-2176-54fd-8a94-67c74bc80f4e",
                "title": "JEE Main 2024 (Online) 30th January Morning Shift",
                "year": 2024
            },
            {
                "exam": "jee-main1",
                "examGroup": "jee",
                "metaId": "307e0097-c53d-56f5-a3a8-d0ec666c3540",
                "title": "JEE Main 2024 (Online) 29th January Evening Shift",
                "year": 2024
            },
            {
                "exam": "jee-main1",
                "examGroup": "jee",
                "metaId": "fa0e21e6-7d3b-51a8-859b-10ecf50d9b75",
                "title": "JEE Main 2024 (Online) 29th January Morning Shift",
                "year": 2024
            },
            {
                "exam": "jee-main1",
                "examGroup": "jee",
                "metaId": "2b5a57d6-27c1-5578-9009-02be012bb832",
                "title": "JEE Main 2024 (Online) 27th January Evening Shift",
                "year": 2024
            },
            {
                "exam": "jee-main1",
                "examGroup": "jee",
                "metaId": "d64b61df-01da-581c-8b88-af23cb610edc",
                "title": "JEE Main 2024 (Online) 27th January Morning Shift",
                "year": 2024
            },
            {
                "exam": "jee-main1",
                "examGroup": "jee",
                "languages": [
                    "en",
                    "hi"
                ],
                "metaId": "214782bb-4fc7-5483-9f33-1550fdee485a",
                "title": "JEE Main 2023 (Online) 15th April Morning Shift",
                "year": 2023
            },
            {
                "exam": "jee-main1",
                "examGroup": "jee",
                "languages": [
                    "en",
                    "hi"
                ],
                "metaId": "25de74b0-d4d6-54a9-bfa9-52a344596dc3",
                "title": "JEE Main 2023 (Online) 13th April Evening Shift",
                "year": 2023
            },
            {
                "exam": "jee-main1",
                "examGroup": "jee",
                "languages": [
                    "en",
                    "hi"
                ],
                "metaId": "03544e3a-1c3b-587e-9192-c5b0270d0b40",
                "title": "JEE Main 2023 (Online) 13th April Morning Shift",
                "year": 2023
            },
            {
                "exam": "jee-main1",
                "examGroup": "jee",
                "languages": [
                    "en",
                    "hi"
                ],
                "metaId": "b1799668-a20e-5c90-933b-fafae15dc02b",
                "title": "JEE Main 2023 (Online) 12th April Morning Shift",
                "year": 2023
            },
            {
                "exam": "jee-main1",
                "examGroup": "jee",
                "languages": [
                    "en",
                    "hi"
                ],
                "metaId": "f1c9ecee-8e97-57ff-9c7e-17514d1e2a06",
                "title": "JEE Main 2023 (Online) 11th April Evening Shift",
                "year": 2023
            },
            {
                "exam": "jee-main1",
                "examGroup": "jee",
                "languages": [
                    "en",
                    "hi"
                ],
                "metaId": "05091ea8-b151-5dcd-8abe-6cbc361faca5",
                "title": "JEE Main 2023 (Online) 11th April Morning Shift",
                "year": 2023
            },
            {
                "exam": "jee-main1",
                "examGroup": "jee",
                "languages": [
                    "en",
                    "hi"
                ],
                "metaId": "5da25ae5-a3f6-5aba-984f-2a9a200cdff8",
                "title": "JEE Main 2023 (Online) 10th April Evening Shift",
                "year": 2023
            },
            {
                "exam": "jee-main1",
                "examGroup": "jee",
                "languages": [
                    "en",
                    "hi"
                ],
                "metaId": "83187747-767c-5dca-b247-5c86bc45acf2",
                "title": "JEE Main 2023 (Online) 10th April Morning Shift",
                "year": 2023
            },
            {
                "exam": "jee-main1",
                "examGroup": "jee",
                "languages": [
                    "en",
                    "hi"
                ],
                "metaId": "2bc74f47-2789-571a-9d49-0a3a13a0e2f5",
                "title": "JEE Main 2023 (Online) 8th April Evening Shift",
                "year": 2023
            },
            {
                "exam": "jee-main1",
                "examGroup": "jee",
                "languages": [
                    "en",
                    "hi"
                ],
                "metaId": "db3c0039-c7c7-53c6-9494-9925c0a6776f",
                "title": "JEE Main 2023 (Online) 8th April Morning Shift",
                "year": 2023
            },
            ],
        "yearwise": null
    },
    {
        "title": "jee-advanced",
        "papers": [
            {
                "exam": "jee-main2",
                "examGroup": "jee",
                "languages": [
                    "en",
                    "hi"
                ],
                "metaId": "827f5667-ea8e-5044-95d0-4a7760764334",
                "title": "JEE Main 2023 (Online) 6th April Evening Shift",
                "year": 2023
            },
            {
                "exam": "jee-main2",
                "examGroup": "jee",
                "languages": [
                    "en",
                    "hi"
                ],
                "metaId": "d023dad4-5840-5ce5-a78d-d671c80f44e2",
                "title": "JEE Main 2023 (Online) 6th April Morning Shift",
                "year": 2023
            },
            {
                "exam": "jee-main2",
                "examGroup": "jee",
                "languages": [
                    "en",
                    "hi"
                ],
                "metaId": "c2b73d8e-8665-5eb6-bd8a-f6f6f576df83",
                "title": "JEE Main 2023 (Online) 1st February Evening Shift",
                "year": 2023
            },
            {
                "exam": "jee-main2",
                "examGroup": "jee",
                "languages": [
                    "en",
                    "hi"
                ],
                "metaId": "d6881fef-53fa-5751-b44f-86e1bbaeedd2",
                "title": "JEE Main 2023 (Online) 1st February Morning Shift",
                "year": 2023
            },
            {
                "exam": "jee-main2",
                "examGroup": "jee",
                "languages": [
                    "en",
                    "hi"
                ],
                "metaId": "1e58889f-25a1-5fd2-aea2-e7eb5802d596",
                "title": "JEE Main 2023 (Online) 31st January Evening Shift",
                "year": 2023
            },
            {
                "exam": "jee-main2",
                "examGroup": "jee",
                "languages": [
                    "en",
                    "hi"
                ],
                "metaId": "07d129c2-8f32-52e5-96a7-8a21cbe99909",
                "title": "JEE Main 2023 (Online) 31st January Morning Shift",
                "year": 2023
            },
            {
                "exam": "jee-main2",
                "examGroup": "jee",
                "languages": [
                    "en",
                    "hi"
                ],
                "metaId": "c53339db-3578-56b1-96ca-e0d6a1be5a1d",
                "title": "JEE Main 2023 (Online) 30th January Evening Shift",
                "year": 2023
            },
            {
                "exam": "jee-main2",
                "examGroup": "jee",
                "languages": [
                    "en",
                    "hi"
                ],
                "metaId": "2c4e100f-768f-5211-adcb-846e8eff7876",
                "title": "JEE Main 2023 (Online) 30th January Morning Shift",
                "year": 2023
            },
            {
                "exam": "jee-main2",
                "examGroup": "jee",
                "languages": [
                    "en",
                    "hi"
                ],
                "metaId": "07bdb7d4-3b64-55ef-bf2c-c22d7d022477",
                "title": "JEE Main 2023 (Online) 29th January Evening Shift",
                "year": 2023
            },
            {
                "exam": "jee-main2",
                "examGroup": "jee",
                "metaId": "d1e21085-2808-52df-ab8b-630934b76170",
                "title": "JEE Main 2023 (Online) 29th January Morning Shift",
                "year": 2023
            },
            {
                "exam": "jee-main2",
                "examGroup": "jee",
                "languages": [
                    "en",
                    "hi"
                ],
                "metaId": "1cb73baf-6c91-58f9-9949-2c3d7fe051a3",
                "title": "JEE Main 2023 (Online) 25th January Evening Shift",
                "year": 2023
            },
            {
                "exam": "jee-main2",
                "examGroup": "jee",
                "languages": [
                    "en",
                    "hi"
                ],
                "metaId": "6a42357e-eb5d-5482-a9ba-5e16ccfa0aca",
                "title": "JEE Main 2023 (Online) 25th January Morning Shift",
                "year": 2023
            },
            {
                "exam": "jee-main2",
                "examGroup": "jee",
                "languages": [
                    "en",
                    "hi"
                ],
                "metaId": "d407a814-eb83-5c65-9854-3995946f755f",
                "title": "JEE Main 2023 (Online) 24th January Evening Shift",
                "year": 2023
            },
            {
                "exam": "jee-main2",
                "examGroup": "jee",
                "languages": [
                    "en",
                    "hi"
                ],
                "metaId": "30e4a735-f594-5f84-99d5-6006668eefaf",
                "title": "JEE Main 2023 (Online) 24th January Morning Shift",
                "year": 2023
            },
            {
                "exam": "jee-main2",
                "examGroup": "jee",
                "metaId": "1588d960-afa9-5d1d-9ccd-e20422d6bb8c",
                "title": "JEE Main 2022 (Online) 29th July Evening Shift",
                "year": 2022,
                "languages": [
                    "en",
                    "hi",
                    "bn"
                ]
            },
            {
                "exam": "jee-main2",
                "examGroup": "jee",
                "metaId": "b3817898-5247-5b43-8fcb-0578ee143481",
                "title": "JEE Main 2022 (Online) 29th July Morning Shift",
                "year": 2022,
                "languages": [
                    "en",
                    "hi",
                    "bn"
                ]
            },
            {
                "exam": "jee-main2",
                "examGroup": "jee",
                "metaId": "8787d575-281f-513f-85fa-973379bdf07e",
                "title": "JEE Main 2022 (Online) 28th July Evening Shift",
                "year": 2022,
                "languages": [
                    "en",
                    "hi",
                    "bn"
                ]
            },
            {
                "exam": "jee-main2",
                "examGroup": "jee",
                "metaId": "922acd97-f770-56c9-b8c8-c8a31be71599",
                "title": "JEE Main 2022 (Online) 28th July Morning Shift",
                "year": 2022,
                "languages": [
                    "en",
                    "hi",
                    "bn"
                ]
            },
            {
                "exam": "jee-main2",
                "examGroup": "jee",
                "metaId": "71fa1725-1418-50d7-b69d-5e30058022bd",
                "title": "JEE Main 2022 (Online) 27th July Evening Shift",
                "year": 2022,
                "languages": [
                    "en",
                    "hi",
                    "bn"
                ]
            },
            {
                "exam": "jee-main2",
                "examGroup": "jee",
                "metaId": "737bc454-981b-5f7e-8f8a-55269aa5527f",
                "title": "JEE Main 2022 (Online) 27th July Morning Shift",
                "year": 2022,
                "languages": [
                    "en",
                    "hi",
                    "bn"
                ]
            }
            ],
        "yearwise": null
    },
    {
        "title": "jee-advanced",
        "papers": [
            {
                "exam": "jee-main3",
                "examGroup": "jee",
                "metaId": "07545fbb-a1dd-589d-b360-1c41282f0a55",
                "title": "JEE Main 2022 (Online) 26th July Evening Shift",
                "year": 2022,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "exam": "jee-main3",
                "examGroup": "jee",
                "metaId": "3d262d90-4bcd-5de0-a06f-cba5e073b88b",
                "title": "JEE Main 2022 (Online) 26th July Morning Shift",
                "year": 2022,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "exam": "jee-main3",
                "examGroup": "jee",
                "metaId": "8d27577d-fb76-53d2-b7ba-f17d7accd9b7",
                "title": "JEE Main 2022 (Online) 25th July Evening Shift",
                "year": 2022,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "exam": "jee-main3",
                "examGroup": "jee",
                "metaId": "94db8154-cd3e-5551-9850-c58f7feff354",
                "title": "JEE Main 2022 (Online) 25th July Morning Shift",
                "year": 2022,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "exam": "jee-main3",
                "examGroup": "jee",
                "metaId": "e9b08a45-e32f-505c-831a-870a4cf8dd40",
                "title": "JEE Main 2022 (Online) 30th June Morning Shift",
                "year": 2022
            },
            {
                "exam": "jee-main3",
                "examGroup": "jee",
                "metaId": "866f4ab8-85b0-5d68-92c6-98969b1084d2",
                "title": "JEE Main 2022 (Online) 29th June Evening Shift",
                "year": 2022,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "exam": "jee-main3",
                "examGroup": "jee",
                "metaId": "45a6d9f0-ae63-5345-b01f-c9bfdd05d05e",
                "title": "JEE Main 2022 (Online) 29th June Morning Shift",
                "year": 2022,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "exam": "jee-main3",
                "examGroup": "jee",
                "metaId": "e548943e-2e9d-5284-811f-03a369f9df00",
                "title": "JEE Main 2022 (Online) 28th June Evening Shift",
                "year": 2022,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "exam": "jee-main3",
                "examGroup": "jee",
                "metaId": "eec17d19-cb08-5018-bf34-f2ef27cfc92f",
                "title": "JEE Main 2022 (Online) 28th June Morning Shift",
                "year": 2022,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "exam": "jee-main3",
                "examGroup": "jee",
                "metaId": "75f42733-5c49-5817-912b-13b0a3aabe3d",
                "title": "JEE Main 2022 (Online) 27th June Evening Shift",
                "year": 2022,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "exam": "jee-main3",
                "examGroup": "jee",
                "metaId": "4922102f-f2e8-5a4c-90ca-824d90af9c96",
                "title": "JEE Main 2022 (Online) 27th June Morning Shift",
                "year": 2022,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "exam": "jee-main3",
                "examGroup": "jee",
                "metaId": "b2d8e90c-522a-514b-960a-55e3d0d20def",
                "title": "JEE Main 2022 (Online) 26th June Evening Shift",
                "year": 2022,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "exam": "jee-main3",
                "examGroup": "jee",
                "metaId": "64fe97e8-5f68-58ec-9785-96e42fd0abe4",
                "title": "JEE Main 2022 (Online) 26th June Morning Shift",
                "year": 2022,
                "languages": [
                    "en",
                    "hi",
                    "bn"
                ]
            },
            {
                "exam": "jee-main3",
                "examGroup": "jee",
                "metaId": "d7a93cc9-bd5f-5cd3-bfaf-a405b1c2e76f",
                "title": "JEE Main 2022 (Online) 25th June Evening Shift",
                "year": 2022,
                "languages": [
                    "en",
                    "hi",
                    "bn"
                ]
            },
            {
                "exam": "jee-main3",
                "examGroup": "jee",
                "metaId": "8c568b64-5c08-5655-998c-8c3b32baab20",
                "title": "JEE Main 2022 (Online) 25th June Morning Shift",
                "year": 2022,
                "languages": [
                    "en",
                    "hi",
                    "bn"
                ]
            },
            {
                "exam": "jee-main3",
                "examGroup": "jee",
                "metaId": "b62cab52-8f68-557d-98f1-c0080675c6e9",
                "title": "JEE Main 2022 (Online) 24th June Evening Shift",
                "year": 2022,
                "languages": [
                    "en",
                    "hi",
                    "bn"
                ]
            },
            {
                "exam": "jee-main3",
                "examGroup": "jee",
                "metaId": "3194fa1b-a37d-5b12-8959-f70a25a0555d",
                "title": "JEE Main 2022 (Online) 24th June Morning Shift",
                "year": 2022,
                "languages": [
                    "en",
                    "hi",
                    "bn"
                ]
            },
            {
                "metaId": "eda8bf69-34ca-5fb1-9eb4-ca8c115d5473",
                "exam": "jee-main3",
                "examGroup": "jee",
                "title": "JEE Main 2021 (Online) 1st September Evening Shift",
                "year": 2021
            },
            {
                "metaId": "87a4acb2-1ee0-5e2c-898a-c7bbcc5f39a8",
                "exam": "jee-main3",
                "examGroup": "jee",
                "title": "JEE Main 2021 (Online) 31st August Evening Shift",
                "year": 2021
            },
            {
                "metaId": "33126c70-1f09-564b-8928-d316bf3f15f3",
                "exam": "jee-main3",
                "examGroup": "jee",
                "title": "JEE Main 2021 (Online) 31st August Morning Shift",
                "year": 2021
            },
            ]
        "yearwise": null
    },
    {
        "title": "jee-advanced",
        "papers": [
            {
                "metaId": "740d2f62-bb70-574b-84ac-334e1d5ccfec",
                "exam": "jee-main4",
                "examGroup": "jee",
                "title": "JEE Main 2021 (Online) 27th August Evening Shift",
                "year": 2021
            },
            {
                "metaId": "740985b6-b19d-53f0-b21e-7a8c619518dc",
                "exam": "jee-main4",
                "examGroup": "jee",
                "title": "JEE Main 2021 (Online) 27th August Morning Shift",
                "year": 2021
            },
            {
                "metaId": "5eae82cf-69e4-554e-a9d9-0fc81e34b9a6",
                "exam": "jee-main4",
                "examGroup": "jee",
                "title": "JEE Main 2021 (Online) 26th August Evening Shift",
                "year": 2021
            },
            {
                "metaId": "5b6df9c4-41f7-570e-b618-0e014dc29e71",
                "exam": "jee-main4",
                "examGroup": "jee",
                "title": "JEE Main 2021 (Online) 26th August Morning Shift",
                "year": 2021
            },
            {
                "metaId": "882d7b0b-b394-5a12-8391-efefee4f2676",
                "exam": "jee-main4",
                "examGroup": "jee",
                "title": "JEE Main 2021 (Online) 27th July Evening Shift",
                "year": 2021
            },
            {
                "metaId": "7cae717a-67a4-57ba-aacf-d2ccdbdbc1b2",
                "exam": "jee-main4",
                "examGroup": "jee",
                "title": "JEE Main 2021 (Online) 27th July Morning Shift",
                "year": 2021
            },
            {
                "metaId": "10521f31-1c30-509e-811f-5cd9ccc7068a",
                "exam": "jee-main4",
                "examGroup": "jee",
                "title": "JEE Main 2021 (Online) 25th July Evening Shift",
                "year": 2021
            },
            {
                "metaId": "c23db52c-3266-5b7b-8205-ae2d7785580f",
                "exam": "jee-main4",
                "examGroup": "jee",
                "title": "JEE Main 2021 (Online) 25th July Morning Shift",
                "year": 2021
            },
            {
                "metaId": "dcba11eb-58b0-5f8a-af84-5434ce197f78",
                "exam": "jee-main4",
                "examGroup": "jee",
                "title": "JEE Main 2021 (Online) 22th July Evening Shift",
                "year": 2021
            },
            {
                "metaId": "df064781-6af0-51fc-a2cf-ee28c7879605",
                "exam": "jee-main4",
                "examGroup": "jee",
                "title": "JEE Main 2021 (Online) 20th July Evening Shift",
                "year": 2021
            },
            {
                "metaId": "e4d7d22d-9228-5850-8bfe-2b1a5bb6f0e1",
                "exam": "jee-main4",
                "examGroup": "jee",
                "title": "JEE Main 2021 (Online) 20th July Morning Shift",
                "year": 2021
            },
            {
                "metaId": "54563b4f-908e-52f7-8813-333ade2ec997",
                "exam": "jee-main4",
                "examGroup": "jee",
                "title": "JEE Main 2021 (Online) 18th March Evening Shift",
                "year": 2021
            },
            {
                "metaId": "37c12830-9d24-519e-b25f-1fdd87934b37",
                "exam": "jee-main4",
                "examGroup": "jee",
                "title": "JEE Main 2021 (Online) 18th March Morning Shift",
                "year": 2021
            },
            {
                "metaId": "047bb28e-abca-5f62-b216-123abc50f338",
                "exam": "jee-main4",
                "examGroup": "jee",
                "title": "JEE Main 2021 (Online) 17th March Evening Shift",
                "year": 2021
            },
            {
                "metaId": "54dbf8f5-a523-56c0-88bc-fd9fc7bc8ee0",
                "exam": "jee-main4",
                "examGroup": "jee",
                "title": "JEE Main 2021 (Online) 17th March Morning Shift",
                "year": 2021
            },
            {
                "metaId": "c1cbcfc9-d07c-5466-b0f0-5e929bbf09c3",
                "exam": "jee-main4",
                "examGroup": "jee",
                "title": "JEE Main 2021 (Online) 16th March Evening Shift",
                "year": 2021
            },
            {
                "metaId": "3d435f6d-a965-52fa-8fa8-d7a7443d529c",
                "exam": "jee-main4",
                "examGroup": "jee",
                "title": "JEE Main 2021 (Online) 16th March Morning Shift",
                "year": 2021
            },
            {
                "metaId": "c99de933-f2f1-55c2-95ba-a787626e5e9f",
                "exam": "jee-main4",
                "examGroup": "jee",
                "title": "JEE Main 2021 (Online) 26th February Evening Shift",
                "year": 2021
            },
            {
                "metaId": "b97d3374-8387-51a6-906b-fe94cb34e9ab",
                "exam": "jee-main4",
                "examGroup": "jee",
                "title": "JEE Main 2021 (Online) 26th February Morning Shift",
                "year": 2021
            },
            {
                "metaId": "9d9c01f0-69ad-5a15-8a43-1e4703739456",
                "exam": "jee-main4",
                "examGroup": "jee",
                "title": "JEE Main 2021 (Online) 25th February Evening Shift",
                "year": 2021
            },
            {
                "metaId": "69a4e85a-464c-5b19-91a7-4fa368efe55d",
                "exam": "jee-main5",
                "examGroup": "jee",
                "title": "JEE Main 2021 (Online) 25th February Morning Shift",
                "year": 2021
            },
            {
                "metaId": "5bd7f327-b26e-5951-bc42-64f722556562",
                "exam": "jee-main5",
                "examGroup": "jee",
                "title": "JEE Main 2021 (Online) 24th February Evening Shift",
                "year": 2021,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "metaId": "bf5de6ba-33b7-5a8d-99d1-cd7f53ce8b34",
                "exam": "jee-main5",
                "examGroup": "jee",
                "title": "JEE Main 2021 (Online) 24th February Morning Shift",
                "year": 2021,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "metaId": "045e403b-8c82-5f75-9657-fbced70c314e",
                "exam": "jee-main5",
                "examGroup": "jee",
                "title": "JEE Main 2020 (Online) 6th September Evening Slot",
                "year": 2020
            },
            {
                "metaId": "7e815f52-6383-5f54-8232-d1d1e3817a8c",
                "exam": "jee-main5",
                "examGroup": "jee",
                "title": "JEE Main 2020 (Online) 6th September Morning Slot",
                "year": 2020
            },
            {
                "metaId": "0a9b75a4-e5db-56bd-a400-7890deba3b25",
                "exam": "jee-main5",
                "examGroup": "jee",
                "title": "JEE Main 2020 (Online) 5th September Evening Slot",
                "year": 2020
            },
            {
                "metaId": "114950c0-2f3e-5456-8326-c060a8316ac2",
                "exam": "jee-main5",
                "examGroup": "jee",
                "title": "JEE Main 2020 (Online) 5th September Morning Slot",
                "year": 2020
            },
            {
                "metaId": "eb5ca258-dc02-5681-831e-d85f586c33cb",
                "exam": "jee-main5",
                "examGroup": "jee",
                "title": "JEE Main 2020 (Online) 4th September Evening Slot",
                "year": 2020
            },
            {
                "metaId": "35325825-f157-54c3-86a8-f2f5aa995865",
                "exam": "jee-main5",
                "examGroup": "jee",
                "title": "JEE Main 2020 (Online) 4th September Morning Slot",
                "year": 2020
            },
            {
                "metaId": "1b85f914-10a0-578b-bfcd-a16b755d4be5",
                "exam": "jee-main5",
                "examGroup": "jee",
                "title": "JEE Main 2020 (Online) 3rd September Evening Slot",
                "year": 2020
            },
            {
                "metaId": "bbf67c4f-5ac0-534b-a68d-95d5b8125d99",
                "exam": "jee-main5",
                "examGroup": "jee",
                "title": "JEE Main 2020 (Online) 3rd September Morning Slot",
                "year": 2020
            },
            {
                "metaId": "6aa07dea-5bc6-5812-b925-cc0257b9c637",
                "exam": "jee-main5",
                "examGroup": "jee",
                "title": "JEE Main 2020 (Online) 2nd September Evening Slot",
                "year": 2020
            },
            {
                "metaId": "4933bfcb-984d-523b-af45-3e9942470d10",
                "exam": "jee-main5",
                "examGroup": "jee",
                "title": "JEE Main 2020 (Online) 2nd September Morning Slot",
                "year": 2020
            },
            {
                "metaId": "1db4c4e2-ff06-5478-a323-128f7e8978ec",
                "exam": "jee-main5",
                "examGroup": "jee",
                "title": "JEE Main 2020 (Online) 9th January Evening Slot",
                "year": 2020
            },
            {
                "metaId": "4b43c2d9-b69c-51b0-ace7-894cfcbefe85",
                "exam": "jee-main5",
                "examGroup": "jee",
                "title": "JEE Main 2020 (Online) 9th January Morning Slot",
                "year": 2020
            },
            {
                "metaId": "60a8c2dd-be85-5706-b13a-86ebc369659b",
                "exam": "jee-main5",
                "examGroup": "jee",
                "title": "JEE Main 2020 (Online) 8th January Evening Slot",
                "year": 2020
            },
            {
                "metaId": "c823e73f-1810-54dc-a060-2c9913ec2ce8",
                "exam": "jee-main5",
                "examGroup": "jee",
                "title": "JEE Main 2020 (Online) 8th January Morning Slot",
                "year": 2020
            },
            {
                "metaId": "846bfdc9-7d10-58f8-be7c-2024909615ae",
                "exam": "jee-main5",
                "examGroup": "jee",
                "title": "JEE Main 2020 (Online) 7th January Evening Slot",
                "year": 2020
            },
            {
                "metaId": "c90d82f6-44bf-5eae-b089-b61b2ec55356",
                "exam": "jee-main5",
                "examGroup": "jee",
                "title": "JEE Main 2020 (Online) 7th January Morning Slot",
                "year": 2020
            },
            {
                "metaId": "904541cd-6182-515e-80e8-fe513baacbd3",
                "exam": "jee-main5",
                "examGroup": "jee",
                "title": "JEE Main 2019 (Online) 12th April Evening Slot",
                "year": 2019
            },
            {
                "metaId": "6c579596-f3fb-51cb-9cd8-7699452b6311",
                "exam": "jee-main6",
                "examGroup": "jee",
                "title": "JEE Main 2019 (Online) 12th April Morning Slot",
                "year": 2019
            },
            {
                "metaId": "9367e860-d0aa-57e3-805a-e7020dee4ad0",
                "exam": "jee-main6",
                "examGroup": "jee",
                "title": "JEE Main 2019 (Online) 10th April Evening Slot",
                "year": 2019
            },
            {
                "metaId": "96ce72f8-d09c-561d-ad6c-8d708c469953",
                "exam": "jee-main6",
                "examGroup": "jee",
                "title": "JEE Main 2019 (Online) 10th April Morning Slot",
                "year": 2019
            },
            {
                "metaId": "afea45f1-e086-5cb2-b331-c8f242bdadb0",
                "exam": "jee-main6",
                "examGroup": "jee",
                "title": "JEE Main 2019 (Online) 9th April Evening Slot",
                "year": 2019
            },
            {
                "metaId": "b021ad2a-0f42-5c77-a9cb-035f6603d102",
                "exam": "jee-main6",
                "examGroup": "jee",
                "title": "JEE Main 2019 (Online) 9th April Morning Slot",
                "year": 2019
            },
            {
                "metaId": "928df3da-9a71-5dc8-ad5f-6fec4f281a54",
                "exam": "jee-main6",
                "examGroup": "jee",
                "title": "JEE Main 2019 (Online) 8th April Evening Slot",
                "year": 2019
            },
            {
                "metaId": "df84f097-aaf3-5735-8c23-ee7ad0322a6b",
                "exam": "jee-main6",
                "examGroup": "jee",
                "title": "JEE Main 2019 (Online) 8th April Morning Slot",
                "year": 2019
            },
            {
                "metaId": "bd85a73c-f338-51da-8236-77cad3658524",
                "exam": "jee-main6",
                "examGroup": "jee",
                "title": "JEE Main 2019 (Online) 12th January Evening Slot",
                "year": 2019
            },
            {
                "metaId": "0e51d14d-6390-5165-a007-46e676d027ff",
                "exam": "jee-main6",
                "examGroup": "jee",
                "title": "JEE Main 2019 (Online) 12th January Morning Slot",
                "year": 2019
            },
            {
                "metaId": "82510a35-9cf3-5832-bc50-11ed96f21d64",
                "exam": "jee-main6",
                "examGroup": "jee",
                "title": "JEE Main 2019 (Online) 11th January Evening Slot",
                "year": 2019
            },
            {
                "metaId": "d55b5069-21fd-5790-b39b-eb78bf54683f",
                "exam": "jee-main6",
                "examGroup": "jee",
                "title": "JEE Main 2019 (Online) 11th January Morning Slot",
                "year": 2019
            },
            {
                "metaId": "655185d8-0979-5339-a76e-cd3b78d5b046",
                "exam": "jee-main6",
                "examGroup": "jee",
                "title": "JEE Main 2019 (Online) 10th January Evening Slot",
                "year": 2019
            },
            {
                "metaId": "60c2e233-a623-5ec0-a41d-d583f5abaa05",
                "exam": "jee-main6",
                "examGroup": "jee",
                "title": "JEE Main 2019 (Online) 10th January Morning Slot",
                "year": 2019
            },
            {
                "metaId": "be3f7668-b002-51c8-b9b5-9c1430a7665a",
                "exam": "jee-main6",
                "examGroup": "jee",
                "title": "JEE Main 2019 (Online) 9th January Evening Slot",
                "year": 2019,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "metaId": "cfcdcfe4-75d2-5f87-a35c-81903ab3669f",
                "exam": "jee-main6",
                "examGroup": "jee",
                "title": "JEE Main 2019 (Online) 9th January Morning Slot",
                "year": 2019,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "metaId": "454b9d80-053a-5927-8aac-e7f9634881ef",
                "exam": "jee-main6",
                "examGroup": "jee",
                "title": "JEE Main 2018 (Online) 16th April Morning Slot",
                "year": 2018,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "metaId": "105337fa-3659-59e7-95d2-6de69443ecf7",
                "exam": "jee-main6",
                "examGroup": "jee",
                "title": "JEE Main 2018 (Offline)",
                "year": 2018
            },
            {
                "metaId": "4162312a-81a2-5e05-b125-ca9f56950eac",
                "exam": "jee-main6",
                "examGroup": "jee",
                "title": "JEE Main 2018 (Online) 15th April Evening Slot",
                "year": 2018,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "metaId": "d8de1b9e-1bd1-57e5-b5a8-355748134aa8",
                "exam": "jee-main6",
                "examGroup": "jee",
                "title": "JEE Main 2018 (Online) 15th April Morning Slot",
                "year": 2018,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "metaId": "de89a0f9-dd5c-52ef-8a2e-c9700c6228b9",
                "exam": "jee-main6",
                "examGroup": "jee",
                "title": "JEE Main 2017 (Online) 9th April Morning Slot",
                "year": 2017
            },
            {
                "metaId": "37b74c99-a406-598f-b1f2-1661133e18e0",
                "exam": "jee-main7",
                "examGroup": "jee",
                "title": "JEE Main 2017 (Online) 8th April Morning Slot",
                "year": 2017,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "metaId": "38b58b63-6211-512c-906e-f17f372b9c55",
                "exam": "jee-main7",
                "examGroup": "jee",
                "title": "JEE Main 2017 (Offline)",
                "year": 2017,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "metaId": "42bd8498-defd-5c7a-a1b9-d5aa73c192f0",
                "exam": "jee-main7",
                "examGroup": "jee",
                "title": "JEE Main 2016 (Online) 10th April Morning Slot",
                "year": 2016,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "metaId": "a90fe8ad-e181-57c5-8058-d5c1c01e984d",
                "exam": "jee-main7",
                "examGroup": "jee",
                "title": "JEE Main 2016 (Online) 9th April Morning Slot",
                "year": 2016,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "metaId": "88d81891-14ed-570d-8b82-83c72105756f",
                "exam": "jee-main7",
                "examGroup": "jee",
                "title": "JEE Main 2016 (Offline)",
                "year": 2016,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "metaId": "2fa6afc7-b208-58e7-b730-579afc81714b",
                "exam": "jee-main7",
                "examGroup": "jee",
                "title": "JEE Main 2015 (Offline)",
                "year": 2015,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "metaId": "9925c81b-2ed9-5c55-9150-27e86138d21d",
                "exam": "jee-main7",
                "examGroup": "jee",
                "title": "JEE Main 2014 (Offline)",
                "year": 2014
            },
            {
                "metaId": "0a6c36a0-d70f-569a-850e-eeab1b65af78",
                "exam": "jee-main7",
                "examGroup": "jee",
                "title": "JEE Main 2013 (Offline)",
                "year": 2013
            },
            {
                "metaId": "ce7620a1-69ce-5473-af74-b50a0187510b",
                "exam": "jee-main7",
                "examGroup": "jee",
                "title": "AIEEE 2012",
                "year": 2012
            },
            {
                "metaId": "47fbd3fc-fafe-5132-9ea3-e9ecfbd6fd6d",
                "exam": "jee-main7",
                "examGroup": "jee",
                "title": "AIEEE 2011",
                "year": 2011
            },
            {
                "metaId": "d07cdcf0-9b96-540b-b021-f2d93f6c1101",
                "exam": "jee-main7",
                "examGroup": "jee",
                "title": "AIEEE 2010",
                "year": 2010
            },
            {
                "metaId": "d621e092-035a-5b53-97dd-ba8171f30ac0",
                "exam": "jee-main7",
                "examGroup": "jee",
                "title": "AIEEE 2009",
                "year": 2009
            },
            {
                "metaId": "e578f907-1929-5772-9308-eab68c419dd4",
                "exam": "jee-main7",
                "examGroup": "jee",
                "title": "AIEEE 2008",
                "year": 2008
            },
            {
                "metaId": "d4a8dea0-8e75-546b-8e37-b47143e31816",
                "exam": "jee-main7",
                "examGroup": "jee",
                "title": "AIEEE 2007",
                "year": 2007
            },
            {
                "metaId": "937c4fef-de3f-55dc-a274-3736ecc6ff60",
                "exam": "jee-main7",
                "examGroup": "jee",
                "title": "AIEEE 2006",
                "year": 2006
            },
            {
                "metaId": "70930f33-12c0-504d-a11a-922b9441920e",
                "exam": "jee-main7",
                "examGroup": "jee",
                "title": "AIEEE 2005",
                "year": 2005
            },
            {
                "metaId": "9436b82c-9e76-5724-b7d2-d70d17109d53",
                "exam": "jee-main7",
                "examGroup": "jee",
                "title": "AIEEE 2004",
                "year": 2004
            },
            {
                "metaId": "c09a0ac4-12c5-5c97-bc98-2a5e28f68d34",
                "exam": "jee-main7",
                "examGroup": "jee",
                "title": "AIEEE 2003",
                "year": 2003
            },
            {
                "metaId": "3bf79812-5219-571d-805f-6874066c18b5",
                "exam": "jee-main7",
                "examGroup": "jee",
                "name": "AIEEE 2002",
                "year": 2002,
                "title": "AIEEE 2002"
            }
        ],
        "yearwise": [
            [
                "2024",
                [
                    0,
                    10
                ]
            ],
            [
                "2023",
                [
                    10,
                    34
                ]
            ],
            [
                "2022",
                [
                    34,
                    57
                ]
            ],
            [
                "2021",
                [
                    57,
                    83
                ]
            ],
            [
                "2020",
                [
                    83,
                    99
                ]
            ],
            [
                "2019",
                [
                    99,
                    115
                ]
            ],
            [
                "2018",
                [
                    115,
                    119
                ]
            ],
            [
                "2017",
                [
                    119,
                    122
                ]
            ],
            [
                "2016",
                [
                    122,
                    125
                ]
            ],
            [
                "2015-2002",
                [
                    125,
                    139
                ]
            ]
        ]
    },
    {
        "title": "jee-advanced",
        "papers": [
            {
                "exam": "jee-advanced",
                "examGroup": "jee",
                "metaId": "36549f67-09d3-5301-9d38-46bb22e80311",
                "title": "JEE Advanced 2023 Paper 2 Online",
                "year": 2023
            },
            {
                "exam": "jee-advanced",
                "examGroup": "jee",
                "metaId": "0c7fae4a-3b47-5fbe-a9d3-fca8ab28c1c7",
                "title": "JEE Advanced 2023 Paper 1 Online",
                "year": 2023
            },
            {
                "exam": "jee-advanced",
                "examGroup": "jee",
                "languages": [
                    "en",
                    "hi"
                ],
                "metaId": "1288585e-0c9e-5dc6-84aa-d334e918ff2e",
                "title": "JEE Advanced 2022 Paper 2 Online",
                "year": 2022
            },
            {
                "exam": "jee-advanced",
                "examGroup": "jee",
                "languages": [
                    "en",
                    "hi"
                ],
                "metaId": "11a1e339-6dc3-5063-9601-59d31321b359",
                "title": "JEE Advanced 2022 Paper 1 Online",
                "year": 2022
            },
            {
                "metaId": "d60051fe-4928-52c7-abf2-723674fde4c7",
                "exam": "jee-advanced",
                "examGroup": "jee",
                "title": "JEE Advanced 2021 Paper 2 Online",
                "year": 2021,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "metaId": "9e4032fc-d606-5202-a9d5-227f09c71edf",
                "exam": "jee-advanced",
                "examGroup": "jee",
                "title": "JEE Advanced 2021 Paper 1 Online",
                "year": 2021,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "metaId": "c0268d28-44d9-55a3-80d1-59a2dc99726e",
                "exam": "jee-advanced",
                "examGroup": "jee",
                "title": "JEE Advanced 2020 Paper 2 Offline",
                "year": 2020,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "metaId": "ef6d3755-e34e-58f5-b231-4702f5fb2772",
                "exam": "jee-advanced",
                "examGroup": "jee",
                "title": "JEE Advanced 2020 Paper 1 Offline",
                "year": 2020,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "metaId": "731795a9-7202-5aa8-956b-ae89c5c72436",
                "exam": "jee-advanced",
                "examGroup": "jee",
                "title": "JEE Advanced 2019 Paper 2 Offline",
                "year": 2019,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "metaId": "969b4807-f10b-56ec-b086-ff72d793f0eb",
                "exam": "jee-advanced",
                "examGroup": "jee",
                "title": "JEE Advanced 2019 Paper 1 Offline",
                "year": 2019,
                "languages": [
                    "en",
                    "hi"
                ]
            },
            {
                "metaId": "f802076b-3aa9-58f2-8165-21cd21a2b87c",
                "exam": "jee-advanced",
                "examGroup": "jee",
                "title": "JEE Advanced 2018 Paper 2 Offline",
                "year": 2018,
                "languages": [
                    "en"
                ]
            },
            {
                "metaId": "ee98f4c2-717b-5ec1-b42c-7f2536c8b174",
                "exam": "jee-advanced",
                "examGroup": "jee",
                "title": "JEE Advanced 2018 Paper 1 Offline",
                "year": 2018,
                "languages": [
                    "en"
                ]
            },
            {
                "metaId": "014be169-4893-5d08-a744-5ca0749e3c20",
                "exam": "jee-advanced",
                "examGroup": "jee",
                "title": "JEE Advanced 2017 Paper 2 Offline",
                "year": 2017,
                "languages": [
                    "en"
                ]
            },
            {
                "metaId": "2fab0844-6560-5642-bd66-03e247cd7ada",
                "exam": "jee-advanced",
                "examGroup": "jee",
                "title": "JEE Advanced 2017 Paper 1 Offline",
                "year": 2017,
                "languages": [
                    "en"
                ]
            },
            {
                "metaId": "646b588d-a541-55c8-bf95-ff4ad8d5ce94",
                "exam": "jee-advanced",
                "examGroup": "jee",
                "title": "JEE Advanced 2016 Paper 2 Offline",
                "year": 2016,
                "languages": [
                    "en"
                ]
            },
            {
                "metaId": "8f008a1f-2b4d-5deb-a4db-cdecc4c8756c",
                "exam": "jee-advanced",
                "examGroup": "jee",
                "title": "JEE Advanced 2016 Paper 1 Offline",
                "year": 2016,
                "languages": [
                    "en"
                ]
            },
            {
                "metaId": "fcf60658-794f-54fe-9711-07201a55ebeb",
                "exam": "jee-advanced",
                "examGroup": "jee",
                "title": "JEE Advanced 2015 Paper 2 Offline",
                "year": 2015,
                "languages": [
                    "en"
                ]
            },
            {
                "metaId": "fc2d384b-0d21-514e-b9e8-d2b009ed4da6",
                "exam": "jee-advanced",
                "examGroup": "jee",
                "title": "JEE Advanced 2015 Paper 1 Offline",
                "year": 2015,
                "languages": [
                    "en"
                ]
            },
            {
                "exam": "jee-advanced",
                "examGroup": "jee",
                "metaId": "e0e067b4-c1b0-5f90-a59c-261812389aeb",
                "title": "JEE Advanced 2014 Paper 2 Offline",
                "year": 2014,
                "languages": [
                    "en"
                ]
            },
            {
                "exam": "jee-advanced",
                "examGroup": "jee",
                "metaId": "f9150044-496a-5ff3-ab4a-6c6c09ba7907",
                "title": "JEE Advanced 2014 Paper 1 Offline",
                "year": 2014,
                "languages": [
                    "en"
                ]
            },
            {
                "exam": "jee-advanced",
                "examGroup": "jee",
                "metaId": "72bd4b50-def0-5b4a-b3a2-2d1f2ed451f1",
                "title": "JEE Advanced 2013 Paper 2 Offline",
                "year": 2013,
                "languages": [
                    "en"
                ]
            },
            {
                "exam": "jee-advanced",
                "examGroup": "jee",
                "metaId": "d6d0418b-af20-59ff-95c3-914915e33965",
                "title": "JEE Advanced 2013 Paper 1 Offline",
                "year": 2013,
                "languages": [
                    "en"
                ]
            },
            {
                "exam": "jee-advanced",
                "examGroup": "jee",
                "metaId": "8c8ca5b8-9992-5526-a4bd-e48367bdbefb",
                "title": "IIT-JEE 2012 Paper 2 Offline",
                "year": 2012,
                "languages": [
                    "en"
                ]
            },
            {
                "exam": "jee-advanced",
                "examGroup": "jee",
                "metaId": "321e8a88-32c6-5034-a81c-f01e0069bd8e",
                "title": "IIT-JEE 2012 Paper 1 Offline",
                "year": 2012,
                "languages": [
                    "en"
                ]
            },
            {
                "exam": "jee-advanced",
                "examGroup": "jee",
                "metaId": "8e55c68d-cee5-58ad-a01d-f6377ba797a2",
                "title": "IIT-JEE 2011 Paper 1 Offline",
                "year": 2011,
                "languages": [
                    "en"
                ]
            },
            {
                "exam": "jee-advanced",
                "examGroup": "jee",
                "metaId": "64401e29-885b-5044-8cea-a62fca900fee",
                "title": "IIT-JEE 2011 Paper 2 Offline",
                "year": 2011,
                "languages": [
                    "en"
                ]
            },
            {
                "exam": "jee-advanced",
                "examGroup": "jee",
                "metaId": "76d138e2-06af-555c-8426-64ee1e174875",
                "title": "IIT-JEE 2010 Paper 1 Offline",
                "year": 2010,
                "languages": [
                    "en"
                ]
            },
            {
                "exam": "jee-advanced",
                "examGroup": "jee",
                "metaId": "ab6555b8-2009-50af-a930-73f511cdb5d3",
                "title": "IIT-JEE 2010 Paper 2 Offline",
                "year": 2010,
                "languages": [
                    "en"
                ]
            },
            {
                "exam": "jee-advanced",
                "examGroup": "jee",
                "metaId": "1a5ee191-3c8a-5e6f-9a93-0f355e166727",
                "title": "IIT-JEE 2009 Paper 2 Offline",
                "year": 2009
            },
            {
                "exam": "jee-advanced",
                "examGroup": "jee",
                "metaId": "ff8a8025-27c9-5db0-b544-41165d6dbb98",
                "title": "IIT-JEE 2009 Paper 1 Offline",
                "year": 2009
            },
            {
                "exam": "jee-advanced",
                "examGroup": "jee",
                "metaId": "93e7745d-c9d0-5082-8ccb-e4e309f148de",
                "title": "IIT-JEE 2008 Paper 2 Offline",
                "year": 2008
            },
            {
                "exam": "jee-advanced",
                "examGroup": "jee",
                "metaId": "2d74b9c5-f3b4-57fb-8cc2-cc1aee7e57d0",
                "title": "IIT-JEE 2008 Paper 1 Offline",
                "year": 2008
            }
        ],
        "yearwise": null
    },
    {
        "title": "neet",
        "papers": [
            {
                "exam": "neet",
                "examGroup": "medical",
                "metaId": "3c48616f-298a-5f69-91d2-bcd59444c455",
                "title": "NEET 2023 Manipur",
                "year": 2023
            },
            {
                "exam": "neet",
                "examGroup": "medical",
                "metaId": "cbfbed57-d7d8-5a07-9957-478e4cb62f17",
                "title": "NEET 2023",
                "year": 2023
            },
            {
                "exam": "neet",
                "examGroup": "medical",
                "metaId": "8dd253c6-09a8-5875-b127-a0c00a165a1b",
                "title": "NEET 2022 Phase 2",
                "year": 2022
            },
            {
                "exam": "neet",
                "examGroup": "medical",
                "metaId": "c7fb1fc7-cb24-58d1-99f5-4ced0111082d",
                "title": "NEET 2022 Phase 1",
                "year": 2022,
                "languages": [
                    "en"
                ]
            },
            {
                "exam": "neet",
                "examGroup": "medical",
                "metaId": "2ff56f11-0061-566e-aeca-9cc14246e8fb",
                "title": "NEET 2021",
                "year": 2021
            },
            {
                "metaId": "27ba990b-5085-5196-87dd-9727f95fc228",
                "exam": "neet",
                "examGroup": "medical",
                "title": "NEET 2020 Phase 1",
                "year": 2020
            },
            {
                "metaId": "c3ae87e9-4094-514a-b2a4-b6e98b1d7ec3",
                "exam": "neet",
                "examGroup": "medical",
                "title": "NEET 2019",
                "year": 2019
            },
            {
                "metaId": "ce68b80b-fff0-5db8-8d6a-668d729d487a",
                "exam": "neet",
                "examGroup": "medical",
                "title": "NEET 2018",
                "year": 2018
            },
            {
                "metaId": "57222784-be0a-5653-930c-8ac44c689e21",
                "exam": "neet",
                "examGroup": "medical",
                "title": "NEET 2017",
                "year": 2017
            },
            {
                "metaId": "80eef6f1-3522-515e-b73d-339d85018141",
                "exam": "neet",
                "examGroup": "medical",
                "title": "NEET 2016 Phase 2",
                "year": 2016
            },
            {
                "metaId": "938f3847-eb62-525b-b1b0-02ee459e81f8",
                "exam": "neet",
                "examGroup": "medical",
                "title": "NEET 2016 Phase 1",
                "year": 2016
            },
            {
                "metaId": "47778809-6194-57b2-868a-e4fedb6e9f3a",
                "exam": "neet",
                "examGroup": "medical",
                "title": "AIPMT 2015",
                "year": 2015
            },
            {
                "metaId": "8713af28-1c8f-53cc-9230-bcc6ea3843c9",
                "exam": "neet",
                "examGroup": "medical",
                "title": "AIPMT 2015 Cancelled Paper",
                "year": 2015
            },
            {
                "metaId": "8756d5f2-5c2a-506e-af0c-0198c9fc2187",
                "exam": "neet",
                "examGroup": "medical",
                "title": "AIPMT 2014",
                "year": 2014
            },
            {
                "metaId": "1c4dc710-3261-5cd5-bb3e-ee281740f624",
                "exam": "neet",
                "examGroup": "medical",
                "title": "NEET 2013 (Karnataka)",
                "year": 2013
            },
            {
                "metaId": "48007b77-2c75-5367-9ca7-98b53cceaca8",
                "exam": "neet",
                "examGroup": "medical",
                "title": "NEET 2013",
                "year": 2013
            },
            {
                "metaId": "068d67b3-bca5-5dc4-af63-9dbf0f7ce7be",
                "exam": "neet",
                "examGroup": "medical",
                "title": "AIPMT 2012 Mains",
                "year": 2012
            },
            {
                "metaId": "9bdb3f61-14cf-57d2-9324-5465da11de4d",
                "exam": "neet",
                "examGroup": "medical",
                "title": "AIPMT 2012 Prelims",
                "year": 2012
            },
            {
                "metaId": "a3afa98f-582a-5a4c-ada4-d17ad73090be",
                "exam": "neet",
                "examGroup": "medical",
                "title": "AIPMT 2011 Mains",
                "year": 2011
            },
            {
                "metaId": "dfc116dc-cf26-5489-aa89-99266a7512a9",
                "exam": "neet",
                "examGroup": "medical",
                "title": "AIPMT 2011 Prelims",
                "year": 2011
            },
            {
                "metaId": "da3ac707-aeab-5c4d-807e-6a0705098929",
                "exam": "neet",
                "examGroup": "medical",
                "title": "AIPMT 2010 Mains",
                "year": 2010
            },
            {
                "metaId": "b91bcb0a-a1ae-550b-a078-b25fcbd422ee",
                "exam": "neet",
                "examGroup": "medical",
                "title": "AIPMT 2010 Prelims",
                "year": 2010
            },
            {
                "metaId": "b0e9a6d4-f603-58b1-9723-66c27d5c959b",
                "exam": "neet",
                "examGroup": "medical",
                "title": "AIPMT 2009",
                "year": 2009
            },
            {
                "metaId": "4432d9cf-5356-5982-b930-2f9d9d752fef",
                "exam": "neet",
                "examGroup": "medical",
                "title": "AIPMT 2008",
                "year": 2008
            },
            {
                "metaId": "4076c9ee-750f-5bd9-a821-c59bed8ab4fd",
                "exam": "neet",
                "examGroup": "medical",
                "title": "AIPMT 2007",
                "year": 2007
            },
            {
                "metaId": "084ad628-cb2a-5390-80d1-ccc658633f19",
                "exam": "neet",
                "examGroup": "medical",
                "title": "AIPMT 2006",
                "year": 2006
            },
            {
                "metaId": "6c2de931-ef9f-52bc-af22-bebe0c0ff520",
                "exam": "neet",
                "examGroup": "medical",
                "title": "AIPMT 2005",
                "year": 2005
            },
            {
                "metaId": "e537df27-eaab-55a1-9a01-c84409f04935",
                "exam": "neet",
                "examGroup": "medical",
                "title": "AIPMT 2004",
                "year": 2004
            },
            {
                "metaId": "9f3fa1a4-1199-5b24-b381-d7df26102489",
                "exam": "neet",
                "examGroup": "medical",
                "title": "AIPMT 2003",
                "year": 2003
            },
            {
                "metaId": "3dbc2670-9688-5143-ae78-7fb777e3eaf6",
                "exam": "neet",
                "examGroup": "medical",
                "title": "AIPMT 2002",
                "year": 2002
            },
            {
                "metaId": "762be6c6-de8f-548d-859d-3a2343237947",
                "exam": "neet",
                "examGroup": "medical",
                "title": "AIPMT 2001",
                "year": 2001
            },
            {
                "metaId": "d594604a-f9e6-5929-b3bf-b720a34fabe3",
                "exam": "neet",
                "examGroup": "medical",
                "title": "AIPMT 2000",
                "year": 2000
            }
        ],
        "yearwise": null
    },
    {
        "title": "bitsat",
        "papers": [
            {
                "exam": "bitsat",
                "examGroup": "jee",
                "metaId": "ff6f9a9d-403d-56cb-a711-b2e745c6c1b8",
                "title": "BITSAT 2022",
                "year": 2022
            },
            {
                "exam": "bitsat",
                "examGroup": "jee",
                "metaId": "d7aee13d-2f94-52c8-8f38-7c6b46bd536b",
                "title": "BITSAT 2021",
                "year": 2021,
                "languages": [
                    "en"
                ]
            },
            {
                "exam": "bitsat",
                "examGroup": "jee",
                "metaId": "82743f3b-56e3-5316-be26-22cbec4d81c1",
                "title": "BITSAT 2020",
                "year": 2020,
                "languages": [
                    "en"
                ]
            }
        ],
        "yearwise": null
    }
];

const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  const userMessage = ctx.message && 'text' in ctx.message ? ctx.message.text.toLowerCase() : null;

  if (userMessage) {
    const userName = ctx.from?.first_name || 'Dear User';  // Retrieve user's first name

    // If the user sends /start, prompt them to select an exam
    if (userMessage === '/start') {
      const exams = Array.from(new Set(quizData.map(quiz => quiz.papers[0].exam)));  // Extract unique exams
      let examList = 'Please select an exam:\n\n';

      exams.forEach((exam, index) => {
        examList += `${index + 1}. ${exam}\n`;  // Display available exams
      });

      examList += '\nPlease reply with the number of the exam you want to choose (e.g., 1, 2, etc.).';

      // Send the exam list
      await ctx.reply(examList);
    }

    // If the user selects an exam
    else if (/^\d+$/.test(userMessage)) {
      const examNumber = parseInt(userMessage, 10);
      const exams = Array.from(new Set(quizData.map(quiz => quiz.papers[0].exam)));

      if (examNumber > 0 && examNumber <= exams.length) {
        const selectedExam = exams[examNumber - 1];  // Get selected exam

        // Find quizzes related to the selected exam
        const quizzesInExam = quizData.filter(quiz => quiz.papers[0].exam === selectedExam);

        let quizList = `You selected the ${selectedExam} exam. Here are the available quizzes:\n\n`;
        quizzesInExam.forEach((quiz, quizIndex) => {
          quizList += `${quizIndex + 1 + examNumber - 1}. ${quiz.title.replace('-', ' ').toUpperCase()}\n`;  // Display quiz titles with corrected numbering
          quiz.papers.forEach((paper, paperIndex) => {
            const paperNumber = `${quizIndex + 1 + examNumber - 1}.${paperIndex + 1}`;  // Correct paper numbering
            quizList += `  ${paperNumber}. ${paper.title} (${paper.year})\n`; // Display papers under each quiz
          });
        });

        quizList += '\nPlease reply with the number of the quiz you want to play (e.g., 2.1, 2.2, etc.).';

        // Send the list of quizzes for the selected exam
        await ctx.reply(quizList);
      } else {
        // If the exam number is not valid
        await ctx.reply('Invalid option. Please choose a valid exam number (e.g., 1, 2, etc.).');
      }
    }

    // If the user selects a quiz/paper
    else if (/^\d+(\.\d+)?$/.test(userMessage)) {
      const parts = userMessage.split('.');
      const quizNumber = parseInt(parts[0], 10);
      const paperNumber = parts[1] ? parseInt(parts[1], 10) - 1 : null; // If there's a sub-quiz, get it

      // Check if the input number is valid and within the range of available quizzes
      if (quizNumber > 0 && quizNumber <= quizData.length) {
        const quiz = quizData[quizNumber - 1]; // Get the quiz data based on the user's input

        if (paperNumber !== null && paperNumber >= 0 && paperNumber < quiz.papers.length) {
          const paper = quiz.papers[paperNumber];
          const quizLink = `${baseUrl}${encodeURIComponent(paper.title)}&metaId=${paper.metaId}`;

          // Send a clickable message with the quiz link
          await ctx.reply(`Hey ${userName}, play the following quiz: [${paper.title} - ${paper.year}](${quizLink})`);

          // Send the bot share button using reply with inline keyboard
          await ctx.reply('Share the bot with your friends:', {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: 'Share with friends',
                    url: 'https://t.me/IndianChatgpt_bot',
                  },
                ],
              ],
            },
          });
        } else {
          // If the paper input number is not valid
          await ctx.reply('Invalid option. Please choose a valid paper number (e.g., 1, 1.1, etc.).');
        }
      } else {
        // If the input number is not valid
        await ctx.reply('Invalid option. Please choose a valid quiz number (e.g., 1, 1.1, etc.).');
      }
    } else {
      // Handle case when the user input is not a valid number
      await ctx.reply('Please enter a valid number (e.g., 1, 1.1, etc.) to get the quiz link.');
    }
  }
};

export { greeting };
