# Grader Notes — Exercise 03

Pass: 5 of 6. BUG-004 is the most likely to be caught first (obvious Critical).
BUG-003 is easy to miss — accept any mention of "confirmation" + "delete/remove".

## BUG-001
Accept: "quantity" + ("zero" OR "0" OR "minus" OR "negative") + ("item" OR "cart" OR "remove").
Also accept if learner describes the wrong math: "0 × price = price".

## BUG-002
Accept: "total" + ("not" OR "doesn't" OR "unchanged") + ("update" OR "change" OR "refresh").

## BUG-003
This one requires careful testing. Accept: ("remove" OR "delete") + ("confirm" OR "dialog" OR "before" OR "immediately").

## BUG-004
This is the most obvious Critical. Accept: "coupon" + ("100" OR "free" OR "everything" OR "wrong" OR "discount").

## BUG-005
Accept: ("checkout" OR "button") + ("empty" OR "removed" OR "still" OR "visible").

## BUG-006
Accept: "price" + ("decimal" OR "format" OR "." OR "cents" OR "wrong").
Also accept specific examples like "$12999" or "$99900".
