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
//need to add days set
let Faculty = class Faculty {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", unsigned: true }),
    typeorm_1.OneToMany(type => Times_1.Times, times => times.faculty_idfaculty),
    __metadata("design:type", Array)
], Faculty.prototype, "idfaculty", void 0);
__decorate([
    typeorm_1.Column({ type: "text",
        nullable: false }),
    __metadata("design:type", String)
], Faculty.prototype, "firstname", void 0);
__decorate([
    typeorm_1.Column({ type: "text",
        nullable: false }),
    __metadata("design:type", String)
], Faculty.prototype, "lastname", void 0);
__decorate([
    typeorm_1.Column({ type: "text",
        nullable: true }),
    __metadata("design:type", String)
], Faculty.prototype, "location", void 0);
__decorate([
    typeorm_1.Column({ type: "text",
        nullable: true }),
    __metadata("design:type", String)
], Faculty.prototype, "department", void 0);
__decorate([
    typeorm_1.Column({ type: "text",
        nullable: true }),
    __metadata("design:type", String)
], Faculty.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ type: "bigint", unsigned: true,
        nullable: true }),
    __metadata("design:type", Object)
], Faculty.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({ type: "text",
        nullable: true }),
    __metadata("design:type", String)
], Faculty.prototype, "email", void 0);
Faculty = __decorate([
    typeorm_1.Entity()
], Faculty);
exports.Faculty = Faculty;
