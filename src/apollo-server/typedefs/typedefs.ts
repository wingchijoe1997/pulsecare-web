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

  type Mutation {
    createMedicalRecord(medicalRecord: MedicalRecordInput): MedicalRecord
    # createCourse(course: CourseInput): Course
    # deleteCourse(course: CourseInput): Course
    # enrollStudent(student: StudentInput, course: #CourseInput): Enrollment
    # dropCourse(student: StudentInput, course: CourseInput)#: Course
    # editSection(student: StudentInput, course: #CourseInput, section: Int): Enrollment
  }
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
    dateOfBirth: Date
    #Authenticator: [Authenticator]
    createdAt: Date
    updatedAt: Date
    patients: [User]
    nurse: User
    medicalRecords: [MedicalRecord]
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
    dateOfBirth: Date
    #Authenticator: [Authenticator]
    createdAt: Date
    updatedAt: Date
  }

  type MedicalRecord {
    id: ID!
    patientId: ID!
    chestPain: Int
    restingBloodPressure: Int
    cholesterol: Int
    fastingBloodSugar: Boolean
    restingElectrocardio: Int
    maxHeartRate: Int
    exerciseInduced: Boolean
    stDepressionInducedByExercise: Float
    slope: Int
    vesselsColoredByFluoroscopy: Float
    thalliumStressTest: Float
    hasHeartDisease: Boolean
    createdAt: Date
    updatedAt: Date
    patient: User
  }

  input MedicalRecordInput {
    id: ID
    patientId: ID!
    chestPain: Int
    restingBloodPressure: Int
    cholesterol: Int
    fastingBloodSugar: Boolean
    restingElectrocardio: Int
    maxHeartRate: Int
    exerciseInduced: Boolean
    stDepressionInducedByExercise: Float
    slope: Int
    vesselsColoredByFluoroscopy: Float
    thalliumStressTest: Float
    hasHeartDisease: Boolean
    createdAt: Date
    updatedAt: Date
  }
`;
export default typeDefs;
