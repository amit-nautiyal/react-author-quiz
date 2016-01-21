'use strict';

var data = [
   {
      name: 'Mark Twain',
      imageUrl: 'img/authors/marktwain.jpg',
      books: ['The Adventure of Huckleberry Finn']
   },
   {
      name: 'Joseph Conrad',
      imageUrl: 'img/authors/josephconrad.png',
      books: ['Heart of Darkness']
   },
   {
      name: 'J. K. Rowling',
      imageUrl: 'img/authors/jkrowling.jpg',
      books: ['Harry Potter and the Sorcerers Stone']
   },
   {
      name: 'Stephen King',
      imageUrl: 'img/authors/stephenking.jpg',
      books: ['The Shining', 'IT']
   },
   {
      name: 'Chrales Dickens',
      imageUrl: 'img/authors/charlesdickens.jpg',
      books: ['David Copperfield', 'A Tale of Two Cities']
   },
   {
      name: 'William Shapespeare',
      imageUrl: 'img/authors/williamshakespeare.jpg',
      books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
   }
];

data.selectGame = function () {
   var books = _.shuffle(this.reduce(function(p, c, i) {
      return p.concat(c.books);
   }, [])).slice(0,4);

   var answer = books[_.random(books.length-1)];

   return {
      books: books,
      author: _.find(this, function (author) {
         return author.books.some(function (title) {
            return title === answer;
         });
      }),
      checkAnswer: function(title){
         return this.author.books.some(function (t) {
            return t === title;
         });
      }
   }
}
// data.checkAnswer = function(title){
//    return this.author.books.some(function (t) {
//       return t === title;
//    });
// }
var Book = React.createClass({
   propTypes: {
      title: React.PropTypes.string.isRequired
   },
   handleClick: function() {
      this.props.onBookSelected(this.props.title);
   },
   render: function(){
      return(
         <div onClick={this.handleClick} className="answer">
            <h4>{this.props.title}</h4>
         </div>
      );
   }
});

var Quiz = React.createClass({
   propTypes: {
      // books: React.PropTypes.array.isRequired
   },
   getInitialState: function() {
      return _.extend({
         bgClass: 'neutral',
         showContinue: false
      }, this.props.data.selectGame());
   },
   handleBookSelected: function(title) {
      var isCorrect = this.state.checkAnswer(title);
      this.setState({
         bgClass: isCorrect ? 'pass' : 'fail',
         showContinue: isCorrect
      })
   },
   handleContinue: function(title) {
      this.setState(this.getInitialState());
   },
   render: function() {
      return(
         <div>
            <div className="row">
               <div className="col-md-4">
                  <img src={this.state.author.imageUrl} className="authorimage col-md-10" />
               </div>
               <div className="col-md-7">
                  {this.state.books.map(function(b, i){
                     return(
                        <Book onBookSelected={this.handleBookSelected} title={b} key={i} />
                     )
                  }, this)}
               </div>
               <div className={"col-md-1" + " " +this.state.bgClass}></div>
            </div>
            {this.state.showContinue ? (
               <div className="row">
                  <div className="cols-md-12 text-right">
                     <input onClick={this.handleContinue} type="button" className="btn btn-primary btn-lg" value="Continue" />
                  </div>
               </div>) : <span/>
            }
         </div>
      );
   }
});
ReactDOM.render(
   <Quiz data={data} />,
   document.getElementById('app')
);
