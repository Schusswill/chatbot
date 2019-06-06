import {Entity, PrimaryGeneratedColumn, Column, Index, OneToMany} from "typeorm";
import {Times} from "./Times";
//import {Course} from "Course";

export enum season {
    SPRING = "Spring",
    SUMMER = "Summer",
    FALL   = "Fall"
}


@Entity()
@Index(["subject","number"], { unique: true })
export class Section {

    @OneToMany(type => Times, times => times.idsection)
    @PrimaryGeneratedColumn({type: "int", unsigned: true,})
    idsection: number;
  
    @Column({type: "enum", enum: season, 
             nullable: false, default: null})
    term: season;
  
  //costs
  
    @Column({type: "decimal", precision: 6, scale: 2,
             nullable: false, default: null})
    resident_tuition: number;
  
    @Column({type: "decimal", precision: 6, scale: 2,
             nullable: false, default: null})
    nonresident_tuition: number;
  
    @Column({type: "decimal", precision: 6, scale: 2,
             nullable: false, default: null})
    fees: number;
  
  // end costs
  
    
    @Column({type: "varchar", length: 45,
             nullable: false, default: null})
    subject: string;
  
    @Column({type: "tinyint", width: 250, unsigned: true, 
             nullable: false, default: null})
    number: number;
  
  

    @Column({type: "mediumint", width: 250, 
             nullable: false, default: null})
    course_number: number;

    @Column({type: "text",
            nullable: true})
    description: string;
  
    @Column({type: "text",
            nullable: false})
    url: string;
  
    @Column({type: "smallint", width: 3, unsigned: true, 
             nullable: false, default: null})
    credits: number;
  
    @Column({type: "varchar", length: 45,
             nullable: true, default: null})
    campus: string;
  
    @Column({type: "varchar", length: 45,
             nullable: true, default: null})
    offered_through: string;
  
    @Column({type: "varchar", length: 45,
             nullable: true, default: null})
    location: string;
  
}