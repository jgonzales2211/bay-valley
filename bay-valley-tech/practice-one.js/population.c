# include <stdio.h>

int main() {
int population = 308401808;
int births_per_year = 365 * 60 * 60 *24 / 9;
int migrants_per_year = 365 * 60 * 60 *24 / 47;
int deaths_per_year = 365 * 60 * 60 *24 / 10;

printf("Year\t Estimated Population\n");

for (int year = 2011; year <= 2020; year++) {
population += births_per_year - deaths_per_year + migrants_per_year;
printf("%d\t  %d\n", year, population);
}
return 0;
}