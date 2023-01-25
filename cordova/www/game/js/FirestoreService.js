const SCORE_COLLECTION = "score"

class FirestoreService{
    constructor(dbRef, collection, addDoc, getDocs){
        this.dbRef = dbRef;
        this.collection = collection;
        this.addDoc = addDoc;
        this.getDocs = getDocs;
    }

    async saveScore(name, score, successCallback){
        try {
            const docRef = await this.addDoc(this.collection(this.dbRef, SCORE_COLLECTION), {
              name: name,
              score: score
            });
            console.log("Document written with ID: ", docRef.id);
            successCallback();
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    async fetchScores(){
        const querySnapshot = await this.getDocs(this.collection(this.dbRef, SCORE_COLLECTION));
        const scores = [];
        querySnapshot.forEach((doc) => scores.push(doc.data()));
        return scores;
    }
}