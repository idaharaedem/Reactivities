import React, {useEffect, useContext, useState} from 'react';
import { Grid, GridColumn, Loader} from 'semantic-ui-react';
import  ActivityList  from './ActivityList';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import InfiniteScroll from 'react-infinite-scroller';
import ActivityFilters from './ActivityFilters';
import ListItemPlaceholder from './ListItemPlaceholder';


//React.FC identifies the type of component youre passing through
 const ActivityDashboard: React.FC = () => {
        
        //Getting the activities and edit mode from activity store 
        

        const rootStore = useContext(RootStoreContext)

        const {loadActivities, loadingInitial, totalPages, setPageNumber, pageNumber} = rootStore.activityStore;

        const[loadingNext, setLoadingNext] = useState(false);

        const handleNext = () => {
          setLoadingNext(true);
          setPageNumber(pageNumber + 1);
          loadActivities().then(()=> setLoadingNext(false))
        }

        useEffect(() => {
          //have to tell use effect about the dependencies it needs, you put that in the empty array
          loadActivities();
          // Empty array ensures our use effect runs one time only
        }, [loadActivities]);
      
    

    return (
        <Grid>
            <Grid.Column width={10}>
              {
                loadingInitial && pageNumber === 0 ? <ListItemPlaceholder/> : 
                (
                  <InfiniteScroll
                  pageStart={0}
                  loadMore={handleNext}
                  hasMore={!loadingNext && pageNumber + 1 < totalPages}
                  initialLoad={false}
                  >
                    <ActivityList />
                  </InfiniteScroll>
                )
              }
            
            </Grid.Column>
            <GridColumn width={6}>  
               <ActivityFilters/>
            </GridColumn>
            <GridColumn width={10}>  
               <Loader active={loadingNext}/>
            </GridColumn>
        </Grid>
    )
}

export default observer (ActivityDashboard)
