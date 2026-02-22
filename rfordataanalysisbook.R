# Script name: Commment.R
# Created on: June 1, 2024
# Author: Mike McGrath
# Purpose: Echo user input
# Version: 1.0
# Execution: Must be run as Source to await user input

#Request user input
name <- readline("Please enter your name:")

#Concatenate input and strings
greeting <- paste ("Welcome", name,"!")

#output concatenated string
print(greeting)

title <- "R for Data Analysis"
result <- paste("Type of title:" ,typeof( title))
print(result)
pi <- 3.14159265
dozen <- 12L
print(paste("Type of pi:", typeof(pi)))
print(paste("Type of dozen:",typeof(dozen)))
flag <- T
print(paste("Is flag logical:", is.logical(flag)))

alphabet <- c("Alpha", "Bravo", "Charlie")
print(alphabet)
print(paste("2nd Element:", alphabet[2]))
print(paste("Vector Length:", length(alphabet)))
alphabet[5] <- "Echo"
print(alphabet)
print(paste("Vector Length Now:", length(alphabet)))
print(paste("Is alphabet a Vector:", is.vector(alphabet)))
