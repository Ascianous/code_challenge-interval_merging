# Interval merging strategy
## General note
- always have intervals sorted in ascending order within the interval set
    - limits need to interate through the full interval set 
    (once we've found where to place it in the array had handled any consequent merges, no further iteration through the array is required)

## Adding intervals
(Nomenclature: 
X = incoming interval, where X is of [number, number] type, 
Nn = an entry in the existing interval set, of type [number, number]
Nm = an entry just created via merging
)
- case 0 - there are no intervals in the current interval set
    - we can immediately add the interval to the set

- case 1 - incoming interval (X) is below any existing interval [N0, N1, N2... Nn]
    - is second index lower than the first index of the first interval entry, X[1] < N0[0]
    - add interval to beginning of array

- case 2 - incoming interval (X) is between two existing intervals [N1, N2, N3... Nn]
    - is first index of incoming interval higher than existing interval second index , X[0] > Nn[1]
    - , but second index of incoming interval is lower than the next intervals first index, X[1] < Nn+1[0]
    X[0] > Nn[1] && X[1] < Nn+1[0]
    - add incoming interval between n and n+1 intervals
    edge case - incoming interval is the new maximum of the set (there is no n+1 entry)
            - place interval at the end of the current set

- case 3 - incoming interval (X) overlaps with one or more existing intervals [N1, N2, N3... Nn]
    - for two intervals to overlap, a part of one interval must be contained within the other
    i.e. X[0] <= Nn[0] <= X[1] OR X[0] <= Nn[1] <= X[1] 
    - where this is the case, merge intervals such that Nm[0] is the minimum of X[0] and Nn[0] and Nm[1] is the maximum of X[1] and Nn[1]
    - when a merge has taken place, continue to loop through the current interval set, comparing Nn to Nn-1 (where Nn-1 is the newly formed, merged, interval Nm)
        - if an overlap is found, merge Nn-1 and Nn, and splice Nn out of the array
            - (NOTE: will need to handle looping index at this stage)
        - if no overlap is found, we can break (our intervals are sorted in ascending order, so if there is no overlap with the next interval in the set, there will be no overlaps elsewhere)

### Weaknesses
While a simple queuing system has been implemented to provide some concurrency resilence this is untested. The queue system lacks a route for providing feedback either during an addInterval request or a getInterval request so the end user can know the state of the intervalSet. "Has my interval actually been merged yet?" Further, the Interval Manager itself is likely not the best place for such a queue system to exist.  It could be better handled as a separate module outside of the Interval Manager infrastructure.

The Interval Manager is spawned via a constructor, with no restrictions in place i.e. any number of interval managers could be spawned and have intervals passed to them.  If there should only be one Interval Manager, a singleton infrastructure would fit.  If there should be multiple managers for different data streams a method of gating what information goes to what manager and making sure managers aren't constructed again should be implemented.

There is no built in persistency currently - everything is stored in memory and is lost on restart. If persistancy is needed, options for saving interval set data permanently in a non-relational database could be considered. Additional functions would be needed at/post construction to restore a previous interval set on restart.