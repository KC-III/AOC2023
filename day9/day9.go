package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func parseFile(file *os.File) [][]int {
	scanner := bufio.NewScanner(file)
	var historyIntegers [][]int
	for scanner.Scan() {
		line := scanner.Text()
		var numbersForString []int
		for _, number := range strings.Split(line, " ") {
			v, err := strconv.Atoi(string(number))
			if err != nil {
				fmt.Println(err)
				continue
			}
			numbersForString = append(numbersForString, v)
		}
		historyIntegers = append(historyIntegers, numbersForString)
	}
	return historyIntegers
}

func getDifferences(numbers []int) []int {

	differences := make([]int, len(numbers)-1)
	for index := 0; index < len(numbers)-1; index++ {
		differences[index] = numbers[index+1] - numbers[index]
	}

	return differences
}

func isAllZeros(numArray []int) bool {
	for _, number := range numArray {
		if number != 0 {
			return false
		}
	}
	return true
}

func getAllDifferences(numbers []int) [][]int {
	allDifferences := [][]int{numbers}

	for {
		differences := getDifferences(allDifferences[len(allDifferences)-1])
		allDifferences = append(allDifferences, differences)
		if isAllZeros(differences) {
			break
		}
	}

	return allDifferences
}

func extrapolateNextValue(numbers []int) int {

	allDifferences := getAllDifferences(numbers)
	value := 0
	for index := len(allDifferences) - 1; index >= 0; index-- {
		currentDifferences := allDifferences[index]
		value += currentDifferences[len(currentDifferences)-1]
	}
	return value
}

func extrapolatePreviousValue(numbers []int) int {

	allDifferences := getAllDifferences(numbers)
	sequence := []int{0}
	for index := len(allDifferences) - 2; index >= 0; index-- {
		currentDifferences := allDifferences[index]
		sequence = append(sequence, currentDifferences[0]-sequence[len(sequence)-1])
	}
	return sequence[len(sequence)-1]
}

func main() {

	fileName := os.Args[1]
	fmt.Println("AOC Day 9\nParsing " + fileName)

	file, err := os.Open(fileName)
	if err != nil {
		return
	}

	defer file.Close()
	histories := parseFile(file)
	score := 0
	for index := range histories {
		score += extrapolateNextValue(histories[index])
	}
	fmt.Println("(Part 1) Sum of extropolated values: " + strconv.Itoa(score))

	score = 0
	for index := range histories {
		score += extrapolatePreviousValue(histories[index])
	}
	fmt.Println("(Part 2) Sum of previous values: " + strconv.Itoa(score))
}
