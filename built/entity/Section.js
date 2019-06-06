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
const Times_1 = require("./Times");
//import {Course} from "Course";
var season;
(function (season) {
    season["SPRING"] = "Spring";
    season["SUMMER"] = "Summer";
    season["FALL"] = "Fall";
})(season = exports.season || (exports.season = {}));
let Section = class Section {
};
__decorate([
    typeorm_1.OneToMany(type => Times_1.Times, times => times.idsection),
    typeorm_1.PrimaryGeneratedColumn({ type: "int", unsigned: true, }),
    __metadata("design:type", Number)
], Section.prototype, "idsection", void 0);
__decorate([
    typeorm_1.Column({ type: "enum", enum: season,
        nullable: false, default: null }),
    __metadata("design:type", String)
], Section.prototype, "term", void 0);
__decorate([
    typeorm_1.Column({ type: "decimal", precision: 6, scale: 2,
        nullable: false, default: null }),
    __metadata("design:type", Number)
], Section.prototype, "resident_tuition", void 0);
__decorate([
    typeorm_1.Column({ type: "decimal", precision: 6, scale: 2,
        nullable: false, default: null }),
    __metadata("design:type", Number)
], Section.prototype, "nonresident_tuition", void 0);
__decorate([
    typeorm_1.Column({ type: "decimal", precision: 6, scale: 2,
        nullable: false, default: null }),
    __metadata("design:type", Number)
], Section.prototype, "fees", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 45,
        nullable: false, default: null }),
    __metadata("design:type", String)
], Section.prototype, "subject", void 0);
__decorate([
    typeorm_1.Column({ type: "tinyint", width: 250, unsigned: true,
        nullable: false, default: null }),
    __metadata("design:type", Number)
], Section.prototype, "number", void 0);
__decorate([
    typeorm_1.Column({ type: "mediumint", width: 250,
        nullable: false, default: null }),
    __metadata("design:type", Number)
], Section.prototype, "course_number", void 0);
__decorate([
    typeorm_1.Column({ type: "text",
        nullable: true }),
    __metadata("design:type", String)
], Section.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ type: "text",
        nullable: false }),
    __metadata("design:type", String)
], Section.prototype, "url", void 0);
__decorate([
    typeorm_1.Column({ type: "smallint", width: 3, unsigned: true,
        nullable: false, default: null }),
    __metadata("design:type", Number)
], Section.prototype, "credits", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 45,
        nullable: true, default: null }),
    __metadata("design:type", String)
], Section.prototype, "campus", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 45,
        nullable: true, default: null }),
    __metadata("design:type", String)
], Section.prototype, "offered_through", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 45,
        nullable: true, default: null }),
    __metadata("design:type", String)
], Section.prototype, "location", void 0);
Section = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Index(["subject", "number"], { unique: true })
], Section);
exports.Section = Section;
