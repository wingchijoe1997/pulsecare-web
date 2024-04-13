import gql from "graphql-tag";

const typeDefs = gql`
  scalar Date
  type Query {
    user(user: UserInput): User
    users(user: UserInput): [User]
    patient(user: UserInput): User
    patients(user: UserInput): [User]
    nurse(user: UserInput): User
    nurses(user: UserInput): [User]

    #students(student: StudentInput): [Student]
    #student(student: StudentInput): Student
    #courses(course: CourseInput): [Course]
    #course(course: CourseInput): Course
    #studentEnrollments(student: StudentInput): #[Enrollment]
    #courseEnrollments(course: CourseInput): [Enrollment]
  }

  #type Mutation {
  #createCourse(course: CourseInput): Course
  #deleteCourse(course: CourseInput): Course
  #enrollStudent(student: StudentInput, course: #CourseInput): Enrollment
  #dropCourse(student: StudentInput, course: CourseInput)#: Course
  #editSection(student: StudentInput, course: #CourseInput, section: Int): Enrollment
  #}
  # TODO: Find a way to distinguish between student student and admin student
  type User {
    id: ID
    name: String
    email: String
    emailVerified: String
    sex: String
    role: String
    password: String
    image: String
    #accounts: [Account]
    #sessions: [Session]
    #dateOfBirth: String
    #Authenticator: [Authenticator]
    createdAt: Date
    updatedAt: Date
  }

  input UserInput {
    id: ID
    name: String
    email: String
    emailVerified: String
    sex: String
    role: String
    password: String
    image: String
    #accounts: [Account]
    #sessions: [Session]
    #dateOfBirth: String
    #Authenticator: [Authenticator]
    createdAt: Date
    updatedAt: Date
  }
`;
export default typeDefs;
