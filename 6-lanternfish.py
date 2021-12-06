# this is the slightly better second solution that works for part two as well.
# it does not track each individual fish as a number, but rather the count of fishes on the particular days remaining.

from collections import deque
from functools import reduce

observed_fish = [
    1, 2, 5, 1, 1, 4, 1, 5, 5, 5, 3, 4, 1, 2, 2, 5, 3, 5, 1, 3, 4, 1, 5, 2, 5, 1, 4, 1, 2, 2, 1, 5, 1, 1, 1, 2, 4, 3, 4,
    2, 2, 4, 5, 4, 1, 2, 3, 5, 3, 4, 1, 1, 2, 2, 1, 3, 3, 2, 3, 2, 1, 2, 2, 3, 1, 1, 2, 5, 1, 2, 1, 1, 3, 1, 1, 5, 5, 4,
    1, 1, 5, 1, 4, 3, 5, 1, 3, 3, 1, 1, 5, 2, 1, 2, 4, 4, 5, 5, 4, 4, 5, 4, 3, 5, 5, 1, 3, 5, 2, 4, 1, 1, 2, 2, 2, 4, 1,
    2, 1, 5, 1, 3, 1, 1, 1, 2, 1, 2, 2, 1, 3, 3, 5, 3, 4, 2, 1, 5, 2, 1, 4, 1, 1, 5, 1, 1, 5, 4, 4, 1, 4, 2, 3, 5, 2, 5,
    5, 2, 2, 4, 4, 1, 1, 1, 4, 4, 1, 3, 5, 4, 2, 5, 5, 4, 4, 2, 2, 3, 2, 1, 3, 4, 1, 5, 1, 4, 5, 2, 4, 5, 1, 3, 4, 1, 4,
    3, 3, 1, 1, 3, 2, 1, 5, 5, 3, 1, 1, 2, 4, 5, 3, 1, 1, 1, 2, 5, 2, 4, 5, 1, 3, 2, 4, 5, 5, 1, 2, 3, 4, 4, 1, 4, 1, 1,
    3, 3, 5, 1, 2, 5, 1, 2, 5, 4, 1, 1, 3, 2, 1, 1, 1, 3, 5, 1, 3, 2, 4, 3, 5, 4, 1, 1, 5, 3, 4, 2, 3, 1, 1, 4, 2, 1, 2,
    2, 1, 1, 4, 3, 1, 1, 3, 5, 2, 1, 3, 2, 1, 1, 1, 2, 1, 1, 5, 1, 1, 2, 5, 1, 1, 4
]

test = [3, 4, 3, 1, 2]


# return array with fish count on day on index
# [3, 2, 1] -> 3 fish with 0 days left, 2 with 1, 1 with 2, etc.
def reduce_to_counts(input_fish) -> list[int]:
  list = [0] * 9
  for x in input_fish:
    list[x] = list[x] + 1
  return list


# iterate one day, manipulate in place
def iterate_day(input):
  items = deque(input)
  # save how many fish are going to produce another
  spawn_new = items[0]
  # each fish progresses one day down
  items.rotate(-1)
  # items[6] is the count of fish on day 6 after the rotation as well as all fish that got rotated from index 0 to index 8
  items[6] = items[6] + items[8]
  # after that, index 8 is rewritten with all the new fish that spawned
  items[8] = spawn_new
  # done
  return items


# get result array after days and log optionally
def get_result(input, days, log_steps=False):
  result = reduce_to_counts(input)
  print(f"initial state: {result}")
  for i in range(0, days):
    result = iterate_day(result)
    if (log_steps):
      print(f"After {i + 1} days: {result}")
  return result


print("TEST")
computed = get_result(test, 18, True)
print("Expected count of fish in the sea: ",
      len([6, 0, 6, 4, 5, 6, 0, 1, 1, 2, 6, 0, 1, 1, 1, 2, 2, 3, 3, 4, 6, 7, 8, 8, 8, 8]))

print("Computed count of fish in the sea: ", reduce(lambda a, b: a + b, computed))
print("--------")

print("OBSERVED FISH")
computed = get_result(observed_fish, 256, True)
print("Count of fish in the sea: ", reduce(lambda a, b: a + b, computed))
