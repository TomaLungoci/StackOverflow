drop schema if exists oop2;

create schema oop2;

use oop2;

create table user (

cnp int primary key not null unique,

l_name varchar(50) not null,

f_name varchar(50) not null,

e_mail varchar(50) not null unique

);

create table question (

id int primary key not null unique,

title varchar(50) not null,

question_text varchar(255) not null,

date_created datetime(6) default null,

last_updated datetime(6) default null,

image_url varchar(255) default null,

author_id int not null,

key fk_author (author_id),
constraint fk_author foreign key (author_id) references user (cnp)

);

create table tag (

id int primary key not null unique,

tag_name varchar(50) not null unique

);

insert into user values

(1,"Toma", "Lungoci", "test1@yahoo.com");

insert into user (cnp, l_name, f_name, e_mail) values

(2,"Mihnea", "Becali", "test2@yahoo.com");

insert into tag (id, tag_name) values

(1, "sports");

insert into tag (id, tag_name) values

(2, "fun");

insert into question (id, title, question_text, date_created,
image_url, author_id)
values (1, "how to Spring?", "i wanna use spring but i donno",
 "assets/images/products/placeholder.png", NOW(), 1);