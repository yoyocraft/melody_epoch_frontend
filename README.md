# Melody_Epoch_Frontend

### aseert

> 该部分主要是存放了项目的logo图像和背景



### components

> 该部分主要是全局的页面布局：
>
> - GlobalAside.vue
>
>   > 该部分主要是网页的侧边栏。其包含了以下几个模块：
>   >
>   > - 首页
>   >
>   > - 操作：
>   >
>   >   - 乐队操作：
>   >
>   >     > - 我的乐队信息
>   >     > - 乐队成员
>   >     > - 修改乐队成员分工
>   >     > - 歌曲：
>   >     >   - 创建歌曲信息
>   >     >   - 我的专辑信息
>   >     >   - 歌曲录入专辑
>   >     > - 专辑：
>   >     >   - 创建专辑
>   >     >   - 我的专辑信息
>   >     >   - 歌曲录入专辑
>   >     > - 演唱会：
>   >     >   - 创建演唱会
>   >     >   - 我的演唱会信息
>   >
>   >   - 粉丝操作：
>   >
>   >     > - 喜欢的乐队
>   >     > - 参加的演唱会
>   >
>   > - 乐队展示
>   >
>   > - 乐队成员展示
>   >
>   > - 专辑展示
>   >
>   > - 歌曲展示
>   >
>   > - 演唱会展示
>
> - GlobalHeader.vue
>
>   > - 项目名展示
>   > - 用户图像展示（包含下面功能）
>   >   - 个人信息转跳功能
>   >   - 登出功能
>
> - SongTable.vue
>
>   > - 歌曲展示界面：
>   >
>   >   > 展示内容包括歌曲序号、名称、所属乐队名称、作者、所属专辑名称
>   >
>   > - 操作：
>   >
>   >   > - 加入喜欢
>   >   > - 撤销喜欢



### model

> 该部分为模型层
>
> - album（专辑）
>
>   > 1. `Album` 接口表示一个音乐专辑，包含专辑ID、名称、公司、发行时间、乐队名称、歌曲ID字符串、简介、平均评分和是否已发布等信息。
>   > 2. `AddAlbumReq` 接口表示添加专辑的请求，包含专辑名称、公司、乐队名称和简介等信息。
>   > 3. `AlbumInfo` 接口表示专辑信息，包含专辑ID、名称、公司、乐队名称、平均评分、是否已发布、简介、发行时间和是否可以喜欢等信息。
>   > 4. `SongToAlbumReq` 接口表示将歌曲添加到专辑的请求，包含专辑ID、未选择的歌曲ID数组和已选择的歌曲ID数组。
>   > 5. `AlbumDetailsVO` 接口表示专辑详细信息视图对象，包含专辑ID、名称、公司、发行时间、乐队名称、简介、平均评分、是否可以评论以及评论列表等信息。
>   > 6. `ReleaseAlbumReq` 接口表示发布专辑的请求，包含专辑ID。
>   > 7. `EditAlbumReq` 接口表示编辑专辑的请求，包含专辑ID和简介。
>   > 8. `TopAlbumVO` 接口表示热门专辑视图对象，包含专辑ID、名称、乐队名称和平均评分等信息。
>
> - band（乐队）
>
>   > 1. `BandBriefInfo` 接口表示乐队的简要信息，包含乐队ID、名称、成立时间、领导人姓名、成员数量和是否喜欢等信息。
>   > 2. `BandInfo` 接口表示乐队的详细信息，包含乐队ID、名称、成立时间、领导人姓名、简介、成员数量、是否已发布、是否可以喜欢、是否喜欢、是否可以加入、是否已加入、成员列表、歌曲列表、专辑列表和演唱会列表等信息。
>   > 3. `BandAddReq` 接口表示添加乐队的请求，包含乐队名称、领导人ID和简介等信息。
>   > 4. `EditBandReq` 接口表示编辑乐队的请求，包含乐队ID和简介等信息。
>
> - comment
>
>   > 1. `CommentVO` 接口表示一个评论对象，包含以下属性：
>   >    - commentId: 评论ID（数字）
>   >    - albumId: 专辑ID（数字）
>   >    - content: 评论内容（字符串）
>   >    - parentId: 父评论ID（数字）
>   >    - userId: 用户ID（数字）
>   >    - userName: 用户名（字符串）
>   >    - createTime: 创建时间（字符串）
>   >    - childrenComments: 子评论列表（CommentVO[]）
>   > 2. `AddCommentReq` 接口表示添加评论的请求，包含以下属性：
>   >    - albumId: 专辑ID（数字）
>   >    - parentId: 父评论ID（数字）
>   >    - content: 评论内容（字符串）
>
> - common
>
>   > 定义了一个名为`TransferOption`的接口它包含三个属性：`key`、`label`和`disabled`。
>   >
>   > - `key`是一个数字类型的属性，用于表示选项的唯一标识符。
>   > - `label`是一个字符串类型的属性，用于表示选项的显示标签。
>   > - `disabled`是一个布尔类型的属性，用于表示该选项是否被禁用。如果为`true`，则该选项不可用；如果为`false`，则该选项可用。
>
> - concert
>
>   > 1. `Concert` 接口表示一个音乐会，包含以下属性：
>   >    - `concertId`：音乐会的唯一标识符（数字类型）
>   >    - `name`：音乐会的名称（字符串类型）
>   >    - `startTime`：音乐会的开始时间（字符串类型）
>   >    - `endTime`：音乐会的结束时间（字符串类型）
>   >    - `place`：音乐会的地点（字符串类型）
>   >    - `bandId`：乐队的唯一标识符（数字类型）
>   >    - `bandName`：乐队的名称（字符串类型）
>   >    - `songIdsStr`：歌曲ID列表的字符串形式（数字类型）
>   >    - `maxNum`：音乐会的最大人数（数字类型）
>   > 2. `ConcertAddReq` 接口表示添加音乐会的请求，包含以下属性：
>   >    - `name`：音乐会的名称（字符串类型）
>   >    - `startTime`：音乐会的开始时间（日期类型）
>   >    - `endTime`：音乐会的结束时间（日期类型）
>   >    - `place`：音乐会的地点（字符串类型）
>   >    - `songIdList`：歌曲ID列表（数字数组类型）
>   >    - `maxNum`：音乐会的最大人数（数字类型）
>   > 3. `ConcertBriefInfo` 接口表示音乐会的简要信息，包含以下属性：
>   >    - `concertId`：音乐会的唯一标识符（数字类型）
>   >    - `name`：音乐会的名称（字符串类型）
>   >    - `startTime`：音乐会的开始时间（字符串类型）
>   >    - `endTime`：音乐会的结束时间（字符串类型）
>   >    - `place`：音乐会的地点（字符串类型）
>   >    - `bandName`：乐队的名称（字符串类型）
>   >    - `maxNum`：音乐会的最大人数（数字类型）
>   >    - `isRelease`：是否已发布（数字类型）
>   >    - `canEdit`：是否可以编辑（布尔类型）
>   > 4. `ConcertInfo` 接口表示音乐会的详细信息，包含以下属性：
>   >    - `concertId`：音乐会的唯一标识符（数字类型）
>   >    - `name`：音乐会的名称（字符串类型）
>   >    - `startTime`：音乐会的开始时间（字符串类型）
>   >    - `endTime`：音乐会的结束时间（字符串类型）
>   >    - `place`：音乐会的地点（字符串类型）
>   >    - `bandName`：乐队的名称（字符串类型）
>   >    - `maxNum`：音乐会的最大人数（数字类型）
>   >    - `songInfoVOList`：歌曲信息列表（SongInfo[] 类型）
>   > 5. `JoinConcertReq` 接口表示加入音乐会的请求，包含以下属性：
>   >    - `concertId`：音乐会的唯一标识符（数字类型）
>   > 6. `EditConcertReq` 接口表示编辑音乐会的请求，包含以下属性：
>   >    - `concertId`：音乐会的唯一标识符（数字类型）
>   >    - `name`：音乐会的新名称（字符串类型）
>   >    - `startTime`：音乐会的新开始时间（日期类型）
>   >    - `endTime`：音乐会的新结束时间（日期类型）
>   >    - `place`：音乐会的新地点（字符串类型）
>   >    - `maxNum`：音乐会的新最大人数（数字类型）
>   >    - `songIdList`：新的歌曲ID列表（数字数组类型）
>   > 7. `ReleaseConcertReq` 接口表示发布音乐会的请求，包含以下属性：
>   >    - `concertId`：音乐会的唯一标识符（数字类型）
>   > 8. `ConcertJoinInfo` 接口表示音乐会的参与信息，包含以下属性：
>   >    - `concertId`：音乐会的唯一标识符（数字类型）
>   >    - `joinedNum`：已加入的人数（数字类型）
>   >    - `canJoin`：是否可以加入（布尔类型）
>   >    - `isJoined`：是否已加入该音乐会（布尔类型）
>
> - enums
>
>   > 定义了两个常量对象：`USER_ROLE_TYPE` 和 `EMAIL_LOGIN_TYPE`。
>   >
>   > `USER_ROLE_TYPE` 对象包含两个属性：`MEMBER` 和 `FAN`，分别对应值为 1 和 2。这个对象可能用于表示用户的角色类型，例如成员或粉丝。
>   >
>   > `EMAIL_LOGIN_TYPE` 对象包含两个属性：`CODE_LOGIN` 和 `PASSWORD_LOGIN`，分别对应值为 0 和 1。这个对象可能用于表示用户的登录方式，例如通过验证码登录或通过密码登录。
>   >
>   > 这些常量可以在其他模块中导入并使用，以便在代码中引用它们。
>
> - fan
>
>   >1. `LikeReq` 接口包含两个属性：`likeId`（类型为 number）和 `type`（类型为 number）。这个接口可能用于表示点赞请求，其中 `likeId` 是点赞的唯一标识符，`type` 表示点赞的类型。
>   >2. `LikeAlbumStatus` 接口包含三个属性：`canLike`（类型为 boolean）、`isLiked`（类型为 boolean）和 `isScored`（类型为 boolean）。这个接口可能用于表示专辑的点赞状态，其中 `canLike` 表示是否可以点赞，`isLiked` 表示是否已经点赞，`isScored` 表示是否已经评分。
>   >3. `ScoreAlbumReq` 接口包含两个属性：`albumId`（类型为 number）和 `score`（类型为 number）。这个接口可能用于表示对专辑进行评分的请求，其中 `albumId` 是专辑的唯一标识符，`score` 表示评分的值。
>   >4. `FanInfo` 接口包含六个属性：`fanId`（类型为 number）、`name`（类型为 string）、`gender`（类型为 number）、`age`（类型为 number）、`career`（类型为 string）和 `education`（类型为 string）。这个接口可能用于表示粉丝的信息，其中 `fanId` 是粉丝的唯一标识符，其他属性分别表示粉丝的名字、性别、年龄、职业和教育背景。
>   >5. `EditFanReq` 接口包含六个属性：`fanId`（类型为 number）、`name`（类型为 string）、`gender`（类型为 number）、`age`（类型为 number）、`career`（类型为 string）和 `education`（类型为 string）。这个接口可能用于表示编辑粉丝信息的请求，其中 `fanId` 是粉丝的唯一标识符，其他属性分别表示要修改的粉丝的名字、性别、年龄、职业和教育背景。
>
> - member
>
>   > 1. `Member` 接口表示一个成员的信息，包含以下属性：
>   >    - memberId: 成员的唯一标识符（number类型）
>   >    - name: 成员的名字（string类型）
>   >    - age: 成员的年龄（number类型）
>   >    - part: 成员所在的部门（string类型）
>   >    - joinTime: 成员加入的时间（string类型）
>   >    - leaveTime: 成员离开的时间（string类型）
>   >    - bandId: 成员所属乐队的ID（number类型）
>   >    - bandName: 成员所属乐队的名称（string类型）
>   > 2. `MemberInfo` 接口与 `Member` 接口相同，只是包含了更多的属性信息。
>   > 3. `EditPartReq` 接口表示编辑成员所在部门的要求，包含以下属性：
>   >    - memberId: 需要编辑的成员的唯一标识符（number类型）
>   >    - part: 新的部门名称（string类型）
>   > 4. `JoinBandReq` 接口表示加入乐队的要求，包含以下属性：
>   >    - bandId: 要加入的乐队的唯一标识符（number类型）
>
> - song
>
>   > 1. `Song` 接口表示一首歌曲的信息，包括歌曲ID、名称、所属乐队ID、作者、专辑ID、专辑名称和是否已发布等属性。
>   > 2. `SongAddReq` 接口表示添加歌曲的要求，包括歌曲名称和作者等属性。
>   > 3. `SongItem` 接口表示一个歌曲项，包括歌曲ID和名称等属性。
>   > 4. `SongInfo` 接口表示歌曲的详细信息，包括歌曲ID、名称、所属乐队名称、作者、专辑名称、是否可以喜欢和是否已被喜欢等属性。
>   > 5. `SongToAlbumVO` 接口表示歌曲与专辑之间的关系，包括没有专辑的歌曲列表和有专辑的歌曲列表。
>   > 6. `ReleaseSongReq` 接口表示发布歌曲的要求，包括要发布的歌曲ID。
>
> - user
>
>   > 1. `EmailRegisterParams`：电子邮件注册参数接口，包含以下属性：
>   >    - email：用户的电子邮件地址
>   >    - password：用户的密码
>   >    - checkedPassword：确认密码
>   >    - code：验证码
>   >    - type：用户类型（例如普通用户、粉丝等）
>   > 2. `AccRegisterParams`：账号注册参数接口，包含以下属性：
>   >    - account：用户的账号
>   >    - password：用户的密码
>   >    - checkedPassword：确认密码
>   >    - type：用户类型（例如普通用户、粉丝等）
>   > 3. `AccLoginParams`：账号登录参数接口，包含以下属性：
>   >    - account：用户的账号
>   >    - password：用户的密码
>   > 4. `EmailLoginParams`：电子邮件登录参数接口，包含以下属性：
>   >    - email：用户的电子邮件地址
>   >    - password：用户的密码
>   >    - code：验证码
>   >    - loginType：登录类型（例如普通登录、粉丝登录等）
>   > 5. `UserAuthType`：用户认证类型接口，包含以下属性：
>   >    - isFan：是否为粉丝
>   >    - isLeader：是否为领导
>   >    - isAdmin：是否为管理员
>   > 6. `UserInfo`：用户信息接口，包含以下属性：
>   >    - userId：用户ID
>   >    - nickname：用户昵称
>   >    - email：用户的电子邮件地址
>   >    - type：用户类型（例如普通用户、粉丝等）
>   >    - memberInfoVO：成员信息对象
>   >    - fanInfoVO：粉丝信息对象
>   > 7. `BindEmailReq`：绑定电子邮件请求接口，包含以下属性：
>   >    - email：要绑定的电子邮件地址
>   >    - code：验证码
>   > 8. `EditUserReq`：编辑用户请求接口，包含以下属性：
>   >    - userId：用户ID
>   >    - nickname：用户昵称
>   >    - type：用户类型（例如普通用户、粉丝等）
>   >    - editMemberReq：编辑成员请求对象
>   >    - editFanReq：编辑粉丝请求对象
>   > 9. `QueryReq`：查询请求接口，包含以下属性：
>   >    - searchText：搜索文本
>   >    - searchType：搜索类型
>   >    - current：当前页数

### plugins

> 该层使用axios库创建的HTTP客户端实例，用于与后端服务器进行通信。它包含了一些配置和拦截器，以便在发送请求时处理身份验证、错误处理等任务。

### router

> 该层定义了一些列路由的路径，用于完成不同功能页面之间的相互跳转使得页面简介，功能明确

