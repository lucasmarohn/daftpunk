// Maps one range of numbers to another

// Given:
// X: Your number
// A and B: the known range (e.g. 0-100)

// Your arbitrary range
// C and D: the new range (e.g. 0-5)

// Returns X's value in the arbitrary range

export const getLinearTransform = (x, a, b, c, d) => {
    return (x-a) / (b-a) * (d-c) + c
}