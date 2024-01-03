

class CustomError extends Error {
    constructor (message, statusCode){
        super(message)
        this.statusCode = statusCode

        Error.captureStackTrace(this, this.constructor)
    }
    success = false
}

// environment - development or production
// development 

module.exports = CustomError





// classes are just a prototype to create a new instance/object

// class Person {
//     // initialize the object
//     constructor(name, age) {
//        this.name = name 
//        this.age = age
//     }

//     isVerified = false;

//     printName() {
        
//         console.log(this.name);
//     }
// }

// let person = new Person("Alex", 21);
// let person2 = new Person("John", 25);

// console.log(person.name)
// console.log(person2.name)


// inheritance
// class Student extends Person {
//     constructor(name, age, course){
//         super(name, age)
//         this.course = course
//     }
//     printCourse(){
//         console.log(this.course)
//     }
// }


// const st1 = new Student("aman", 23, "BCA")
// console.log(st1)













// // window, global
// function printName(){
//     console.log(this)
// }
// printName()
// printName() // what is the value of the this keyword



// let person3 = {
//     //  properties
//     name : "",
//     age : "",
//     isVerified : false,

//     // methods
//     printName(){
//         console.log(person3.name)
//     }

// }
