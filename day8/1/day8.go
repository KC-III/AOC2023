package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
)

type Node struct {
	Left  string
	Right string
}

func parseFile(file *os.File) (string, map[string]Node) {
	parsedFile := make(map[string]Node)
	var instructions string
	scanner := bufio.NewScanner(file)

	// Parse over the file line by line
	linesParsed := -1
	for scanner.Scan() {
		linesParsed += 1
		line := scanner.Text()

		if linesParsed == 0 {
			instructions = line
			continue
		}

		if linesParsed == 1 {
			continue
		}
		parsedFile[line[0:3]] = Node{line[7:10], line[12:15]}
	}

	return instructions, parsedFile
}

func findTarget(instructions string, network map[string]Node, start string, target string) int {

	nextStep := start
	stepsTaken := 0

	targetSearch, _ := regexp.Compile("[0-9A-Z][0-9A-Z]" + target)
	if len(target) == 3 {
		targetSearch, _ = regexp.Compile(target)
	}

	for targetSearch.FindString(nextStep) == "" {
		direction := string(instructions[stepsTaken%len(instructions)])
		if direction == "R" {
			nextStep = network[nextStep].Right
		} else {
			nextStep = network[nextStep].Left
		}

		stepsTaken += 1
	}

	return stepsTaken
}

func GCD(a, b int) int {

	for b != 0 {
		t := b
		b = a % b
		a = t
	}
	return a

}

func LCM(numbers []int, index int) int {
	if index == len(numbers)-1 {
		return numbers[index]
	}
	a := numbers[index]
	b := LCM(numbers, index+1)
	return (a * b) / GCD(a, b)
}

func findTargetFromAllStartingPoints(instructions string, network map[string]Node, start string, target string) int {

	var nextSteps []string
	for key := range network {
		if string(key[2]) == start {
			nextSteps = append(nextSteps, key)
		}
	}

	var stepsForEach = make([]int, len(nextSteps))
	for index, step := range nextSteps {
		stepsForEach[index] = findTarget(instructions, network, step, target)
	}

	fmt.Println(nextSteps)
	fmt.Println(stepsForEach)

	return LCM(stepsForEach, 0)
}

func main() {

	fileName := os.Args[1]
	fmt.Println("AOC Day 8\nParsing " + fileName)

	file, err := os.Open(fileName)
	if err != nil {
		return
	}

	defer file.Close()

	instructions, network := parseFile(file)
	fmt.Println("\nPart 1 target found in " + strconv.Itoa(findTarget(instructions, network, "AAA", "ZZZ")) + " steps")
	fmt.Println("\nPart 2 target found in " + strconv.Itoa(findTargetFromAllStartingPoints(instructions, network, "A", "Z")) + " steps")

	/// Wait until enter is pressed
	fmt.Print("\nPress the Enter Key to stop anytime")
	reader := bufio.NewReader(os.Stdin)
	_, _ = reader.ReadString('\n')
}
