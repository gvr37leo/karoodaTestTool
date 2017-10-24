create table Testcases(
	id int identity(0,1)	NOT NULL,
	name varchar(255)		NOT NULL,
	primary key(id)
)

create table Steps(
	id int identity(0,1)					NOT NULL,
	functionPointer varchar(255)			NOT NULL,
	belongsToTestcase int			 NOT NULL,
	stepOrder int NOT NULL
	foreign key (belongsToTestcase) references  Testcases(id)
	primary key(id)
)

create table Parameters(
	id int identity(0,1)			NOT NULL,
	[type] varchar(255)				NOT NULL,
	[value] varchar(255)				NOT NULL,
	belongsToStep int		NOT NULL
	foreign key (belongsToStep) references  Steps(id)
	primary key(id)
)