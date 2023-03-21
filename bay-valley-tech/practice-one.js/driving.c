#include <stdio.h>
int main() {

float miles_driven_per_day, cost_per_gallon, 
miles_per_gallon, parking_fee, tolls, driving_cost_per_day;

miles_driven_per_day= 35;
cost_per_gallon= 3.25;
miles_per_gallon= 27.5;
parking_fee= 2.50;
tolls= 3.80;
driving_cost_per_day= (miles_driven_per_day / miles_per_gallon) * cost_per_gallon + parking_fee + tolls;
 printf("Miles driven per day: %.2f\n", miles_per_day);
    printf("Cost per gallon of gasoline: $%.2f\n", cost_per_gallon);
    printf("Miles per gallon: %.2f\n", miles_per_gallon);
    printf("Daily parking fees: $%.2f\n", parking_fee);
    printf("Daily tolls: $%.2f\n", tolls);
    printf("Your driving cost per day is $%.2f\n", driving_cost);
return 0;
}