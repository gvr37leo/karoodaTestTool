create table Testcase(
	id int identity(1,1)	NOT NULL,
	name varchar(255)		NOT NULL,
	primary key(id)
)

create table Step(
	id int identity(1,1)					NOT NULL,
	functionPointer varchar(255)			NOT NULL,
	belongsToTestcase int			 NOT NULL,
	stepOrder int NOT NULL
	foreign key (belongsToTestcase) references  Testcase(id)
	primary key(id)
)

create table Parameter(
	id int identity(1,1)			NOT NULL,
	name	varchar(255)				NOT NULL,
	[type] varchar(255)				NOT NULL,
	[value] varchar(255),				
	belongsToStep int		NOT NULL
	foreign key (belongsToStep) references  Step(id)
	primary key(id)
)