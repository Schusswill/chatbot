"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//yyyy/dd/m
//remember month is 0 indexed, 12th month is 11th month.
exports.semestertimes = [
    { start: new Date(2018, 7, 15),
        end: new Date(2018, 11, 19),
        semester: "Fall",
        year: 2018
    },
    { start: new Date(2019, 0, 14),
        end: new Date(2019, 4, 16),
        semester: "Spring",
        year: 2019
    },
    { start: new Date(2019, 4, 16),
        end: new Date(2019, 7, 15),
        semester: "Summer",
        year: 2019
    },
    { start: new Date(2019, 4, 16),
        end: new Date(2019, 11, 19),
        semester: "Fall",
        year: 2019
    }
];
