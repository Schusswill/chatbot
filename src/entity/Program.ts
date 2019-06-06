import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import {Pathway} from "./Pathway";
import {Study}   from "./Study";


@Entity()
export class Program {

    @PrimaryGeneratedColumn({type: "int", unsigned: true})
    idprogram: number;
  
    @Column({type: "varchar", width: 45,
            nullable: true, default: null})
    @OneToMany(type => Study, study => study.name)
    name: Study[]
  
    @Column({type: "int", width: 10, unsigned: true,
            nullable: false, default: null})
    @ManyToOne(type => Pathway, pathway => pathway.name)
    pathway: Pathway;

}