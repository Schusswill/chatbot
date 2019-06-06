"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Faculty_1 = require("./Faculty");
const Section_1 = require("./Section");
//need to add days set
let Times = class Times {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", unsigned: true }),
    __metadata("design:type", Number)
], Times.prototype, "idtimes", void 0);
__decorate([
    typeorm_1.Column({ type: "date",
        nullable: false, default: null }),
    __metadata("design:type", Date)
], Times.prototype, "sdate", void 0);
__decorate([
    typeorm_1.Column({ type: "date",
        nullable: false, default: null }),
    __metadata("design:type", Date)
], Times.prototype, "edate", void 0);
__decorate([
    typeorm_1.Column({ type: "time",
        nullable: true, default: null }),
    __metadata("design:type", Date)
], Times.prototype, "stime", void 0);
__decorate([
    typeorm_1.Column({ type: "time",
        nullable: true, default: null }),
    __metadata("design:type", Date)
], Times.prototype, "etime", void 0);
__decorate([
    typeorm_1.Column({ type: "int", width: 255, unsigned: true,
        nullable: false, default: null }),
    typeorm_1.ManyToOne(type => Section_1.Section, section => section.idsection),
    __metadata("design:type", Number)
], Times.prototype, "idsection", void 0);
__decorate([
    typeorm_1.Column({ type: "mediumint", width: 250,
        nullable: false, default: null }),
    typeorm_1.ManyToOne(type => Faculty_1.Faculty, faculty => faculty.idfaculty),
    __metadata("design:type", Number)
], Times.prototype, "faculty_idfaculty", void 0);
Times = __decorate([
    typeorm_1.Entity()
], Times);
exports.Times = Times;
