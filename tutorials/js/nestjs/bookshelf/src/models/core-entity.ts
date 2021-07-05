import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
export abstract class CoreEntity extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Field(() => String)
    @Column()
    name: string;
}
