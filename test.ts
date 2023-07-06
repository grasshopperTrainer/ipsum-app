export { }


function foo() {
    const b = { a: 1 }
    const a = [b]
    a.forEach(x => {
        console.log(x.a)
        if (x.a == 1) {
            console.log('return')
            return x
        }
    })
}

console.log(foo())