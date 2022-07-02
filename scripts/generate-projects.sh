npx nx generate library bookings --buildable --tags "domain:bookings,type:feature"

npx nx generate library feature --directory customers --buildable --tags "domain:customers,type:feature"
npx nx generate library model --directory customers --buildable --tags "domain:customers,type:model"
npx nx generate library ui --directory customers --buildable --tags "domain:customers,type:ui"

npx nx generate library feature --directory diary --buildable --tags "domain:customers,type:feature"

npx nx generate library feature --directory holidays --buildable --tags "domain:holidays,type:feature"
npx nx generate library model --directory holidays --buildable --tags "domain:holidays,type:model"
npx nx generate library ui --directory holidays --buildable --tags "domain:holidays,type:ui"

npx nx generate library config --directory shared --buildable --tags "domain:shared,type:shared:config"
npx nx generate library form --directory shared --buildable --tags "domain:shared,type:shared:form"
npx nx generate library http --directory shared --buildable --tags "domain:shared,type:shared:http"
npx nx generate library master-data --directory shared --buildable --tags "domain:shared,type:shared:master-data"
npx nx generate library ngrx-utils --directory shared --buildable --tags "domain:shared,type:shared:ngrx-utils"
npx nx generate library security --directory shared --buildable --tags "domain:shared,type:shared:security"
npx nx generate library testing --directory shared --buildable --tags "domain:shared,type:shared:testing"
npx nx generate library ui --directory shared --buildable --tags "domain:shared,type:shared:ui"
npx nx generate library ui-messaging --directory shared --buildable --tags "domain:shared,type:shared:ui-messaging"
npx nx generate library util --directory shared --buildable --tags "domain:shared,type:shared:util"

npx nx generate library user --buildable --tags "domain:user,type:feature"
