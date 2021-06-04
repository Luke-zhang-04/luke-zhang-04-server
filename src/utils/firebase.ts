/**
 * Luke Zhang's developer portfolio
 *
 * @license BSD-3-Clause
 * @author Luke Zhang Luke-zhang-04.github.io
 * @copyright Copyright (c) 2020 - 2021 Luke Zhang
 */

import type {default as Firebase} from "firebase-admin"

export const snapshotToArray = (
    snapshot: Firebase.firestore.QuerySnapshot<Firebase.firestore.DocumentData>,
): Firebase.firestore.QueryDocumentSnapshot<Firebase.firestore.DocumentData>[] => {
    const arr: ReturnType<typeof snapshotToArray> = []

    snapshot.forEach((doc) => arr.push(doc))

    return arr
}
