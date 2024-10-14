

let depth = 0;
let primeNumbers = 0;

const isPrime = (number: number) => {
    for (let i = 2; i < number; i++) {
        if (number % i === 0) {
            return false;
        }
    }
    return true;
}

const recursiveFunction = (depth: number) => {
    if (depth > 100) {
        return "Finished";
    }

    depth++;

    if (isPrime(depth)) {
        primeNumbers++;
    }

    return recursiveFunction(depth + 1);
}

console.log(recursiveFunction(0));
console.log(primeNumbers);
console.log(depth);
