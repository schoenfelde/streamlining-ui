class Member extends Component {
    /**
    * @param {Search} search this is the search criteria for the MemberAPI
    * @param {PaginationCollection} pagination This is the page to collect
    * @param {Function} setupPagination this is called to change the pagination method
    * @param {UserObject} user contains the token, socket, and composite
    */
    constructor(props){
        super(props);
        this.state = {
            member: null,
            user: this.props.user,
            membersList: [],
            waiting: false,
            redirectSignup: false,
            signUpPopup: null
        }
        this.navigateMembers = this.navigateMembers.bind(this);
    }

    componentWillMount() {
        let pagination = this.props.pagination;
        // if (!pagination) {
        this.props.setupPagination(this.props.search);
        // }
        // else {
        //     this.setState({membersList: pagination.getAllItems()});
        //     this.setupScroll();
        // }
    }

    componentWillUnmount() {
        window.onscroll = null;
    }

    componentDidUpdate() {
        let that = this;
        let pagination = this.props.pagination;
        if (pagination) {
            if (!this.props.pagination.hasPage(1)) {
                let that = this;
                this.props.pagination.goToPage(1).then(items => {
                    that.setState({membersList: that.props.pagination.getAllItems()});
                    that.setupScroll();
                });
            }
        }
    }

    setupScroll() {
        let that = this;
        let pagination = this.props.pagination;
        window.onscroll = function() {
            if (pagination && !pagination.atLastPage() && !that.state.waiting) {
                let scrolledHeight = window.scrollY;
                let scrollHeight = document.documentElement.scrollHeight;
                let heightOfScreen = window.innerHeight;
                let amountLeftToScroll = scrollHeight - scrolledHeight - heightOfScreen;

                let threshold = heightOfScreen * 2;
                let pastThreshold = amountLeftToScroll < threshold;
                if (pastThreshold) {
                    let heightNeededToPassThresholhd = threshold - amountLeftToScroll;
                    let numberOfPages = pagination.currentNumberOfPagesImmediately();
                    let numberOfPagesToLoad = 1;
                    if (numberOfPages > 0) {
                        let averageHeightPerPage = scrollHeight / numberOfPages;
                        let numberOfPagesNeeded = Math.ceil(heightNeededToPassThresholhd / averageHeightPerPage);
                        let numberOfPagesWaitingToComplete = pagination.numberOfPagesWaiting();
                        numberOfPagesToLoad = numberOfPagesNeeded - numberOfPagesWaitingToComplete;
                        //let pagesLoaded = numberOfPages + numberOfPagesNeeded;
                    }
                    if (numberOfPagesToLoad > 0) {
                        that.setState({waiting: true});
                        // there is the possiblity for a race condition here, that could be horribly wrong....
                        Promise.each(pagination.loadNext(numberOfPagesToLoad), function(item, index, length) {
                            let wait = true;
                            if (index === (length - 1)) {
                                wait = false;
                            }
                            let pageLoaded = numberOfPages + (index + 1); 
                            that.setState({waiting: wait, membersList: pagination.getAllItemsThrough(pageLoaded)});
                        });
                    }
                }
            }
        }
    }
    
    render() {
        let result = null;
        if (this.state.redirectSignup) {
            return <Redirect to='/signup'/>;
        }
        else if (this.state.member) {
            result = <MemberPage member={this.state.member} 
                showMemberList={this.navigateMembers} socket={this.props.socket} 
                user={this.props.user.composite.user}
            />;
        }
        else {
            result = <MemberList navigateMembers={this.navigateMembers} members={this.state.membersList}/>;
        }
        return <div>
            {result}
            {this.state.signUpPopup && <Popup {...this.state.signUpPopup} show /> }
        </div>;
    }
}
