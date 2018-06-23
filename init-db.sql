CREATE TABLE treestable(
    treeid serial unique primary key,
    name character varying(20) not null,
    family character varying(200) not null,
    flowercolor character varying(200) not null
);

ALTER TABLE treestable
    OWNER TO schenker;

alter role schenker connection limit -1;

insert into treestable(name,family,flowercolor)
values('Croton','A.croton','Yellow');
insert into treestable(name,family,flowercolor)
values('Mkoma','A.mkoma','white');
insert into treestable(name,family,flowercolor)
values('mwariki','A.mwariki','pink');
insert into treestable(name,family,flowercolor)
values('ngidori','A.ngodori','blue');