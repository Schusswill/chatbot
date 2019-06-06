import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Faculty} from "./Faculty";
import {Section} from "./Section";

//need to add days set


@Entity()
export class Times {

    @PrimaryGeneratedColumn({type: "int", unsigned: true})
    idtimes: number;
  
    @Column({type: "date",
            nullable: false, default: null})
    sdate: Date;
  
    @Column({type: "date",
            nullable: false, default: null})
    edate: Date;
  
    @Column({type: "time",
            nullable: true, default: null})
    stime: Date;
  
    @Column({type: "time",
            nullable: true, default: null})
    etime: Date;
  
    @Column({type: "int", width: 255, unsigned: true, 
             nullable: false, default: null})
    @ManyToOne(type => Section, section => section.idsection)
    idsection: number;
  
    @Column({type: "mediumint", width: 250, 
             nullable: false, default: null})
    @ManyToOne(type => Faculty, faculty => faculty.idfaculty)
    faculty_idfaculty: number;
  

}