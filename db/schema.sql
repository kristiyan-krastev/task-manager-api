create table Users(
	id int auto_increment primary key,
    firstName varchar(100) not null,
    lastName varchar(100) not null
);

create table Tasks(
	id int auto_increment primary key,
    title varchar(100) not null,
    description varchar(5000) not null
);

create table UsersTasks(
	id int not null,
    userId int not null,
    taskId int not null,

    constraint pk_user_task primary key(userId, taskId),
    constraint fk_user foreign key(userId) references Users(id),
    constraint fk_task foreign key(taskId) references Tasks(id)
);
