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
const Pathway_1 = require("./Pathway");
const Study_1 = require("./Study");
let Program = class Program {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", unsigned: true }),
    __metadata("design:type", Number)
], Program.prototype, "idprogram", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", width: 45,
        nullable: true, default: null }),
    typeorm_1.OneToMany(type => Study_1.Study, study => study.name),
    __metadata("design:type", Array)
], Program.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ type: "int", width: 10, unsigned: true,
        nullable: false, default: null }),
    typeorm_1.ManyToOne(type => Pathway_1.Pathway, pathway => pathway.name),
    __metadata("design:type", Pathway_1.Pathway)
], Program.prototype, "pathway", void 0);
Program = __decorate([
    typeorm_1.Entity()
], Program);
exports.Program = Program;
