import { useEffect } from "react";
import { Route, Link, useParams, useRouteMatch } from "react-router-dom";

import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/hooks/use-http";
import { getSingleQuote } from "../lib/lib/api";

// const DUMMY_DATA = [
//   { id: "q1", author: "Max", text: "Learning React is fun!" },
//   { id: "q2", author: "Maria", text: "Practise makes perfect" },
//   { id: "q3", author: "Joey", text: "WOW WOW WOW" },
// ];

const QuoteDetail = () => {
  const params = useParams();
  const match = useRouteMatch();

  const {
    sendRequest,
    data: quote,
    status,
    error,
  } = useHttp(getSingleQuote, true);

  const { quoteId } = params;

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (!quote.text) {
    return <p className="centered">No quote found!</p>;
  }

  return (
    <section>
      <HighlightedQuote author={quote.author} text={quote.text} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </section>
  );
};

export default QuoteDetail;
