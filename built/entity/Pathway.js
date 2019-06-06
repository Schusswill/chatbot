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
const Program_1 = require("./Program");
const Faculty_1 = require("./Faculty");
let Pathway = class Pathway {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", unsigned: true }),
    typeorm_1.ManyToMany(type => Faculty_1.Faculty),
    typeorm_1.JoinTable({
        name: "pathway_has_advisor",
        joinColumn: {
            name: "pathway_idpathway",
            referencedColumnName: "idpathway"
        },
        inverseJoinColumn: {
            name: "faculty_idfaculty",
            referencedColumnName: "idfaculty"
        }
    }),
    __metadata("design:type", Array)
], Pathway.prototype, "idpathway", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", width: 45,
        nullable: false, default: null }),
    typeorm_1.OneToMany(type => Program_1.Program, program => program.pathway),
    __metadata("design:type", Array)
], Pathway.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", width: 45,
        nullable: false, default: null }),
    __metadata("design:type", String)
], Pathway.prototype, "url", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", width: 45,
        nullable: false, default: null }),
    __metadata("design:type", String)
], Pathway.prototype, "img_url", void 0);
Pathway = __decorate([
    typeorm_1.Entity()
], Pathway);
exports.Pathway = Pathway;
