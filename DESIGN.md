# Interval merging strategy
### General note
- always have intervals sorted in ascending order within the interval set
    - limits need to interate through the full interval set 
    (once we've found where to place it in the array had handled any consequent merges, no further iteration through the array is required)

### Adding intervals
(Nomenclature: 
X = incoming interval, where X is of [number, number] type, 
Nn = an entry in the existing interval set, of type [number, number]
Nm = an entry just created via merging
)
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
    - when a merge has taken place, continue to loop through the current interval set, comparing Nn to Nn-1 (where Nn-1 is the newly formed merged interval Nm)
        - if an overlap is found, merge Nn-1 and Nn, and splice Nn out of the array
            - (NOTE: will need to handle looping index at this stage)
        - if no overlap is found, we can break (our intervals are sorted in ascending order, so if there is no overlap with the next interval in the set, there will be no overlaps elsewhere)